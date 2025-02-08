package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

const (
	// デフォルトのレート制限設定
	defaultRequestsPerMinute = 30 // 1分間に30リクエスト
	defaultBurst             = 5  // 同時に最大5リクエストまで

	// エラーメッセージ
	errRateLimitExceeded = "リクエスト制限を超えました。しばらく待ってから再度お試しください。"

	// クリーンアップ関連の設定
	cleanupInterval = time.Hour
	limiterTimeout  = time.Hour
)

// RateLimitError はレート制限エラーのレスポンス構造体
type RateLimitError struct {
	Error string `json:"error"`
}

type rateLimiterWithTime struct {
	limiter *rate.Limiter
	lastHit time.Time
}

type RateLimiter struct {
	ips   map[string]*rateLimiterWithTime
	mu    *sync.RWMutex
	rate  rate.Limit
	burst int
	done  chan bool
}

// NewRateLimiter は新しいRateLimiterインスタンスを作成します
func NewRateLimiter(r rate.Limit, b int) *RateLimiter {
	rl := &RateLimiter{
		ips:   make(map[string]*rateLimiterWithTime),
		mu:    &sync.RWMutex{},
		rate:  r,
		burst: b,
		done:  make(chan bool),
	}

	// 定期的なクリーンアップを開始
	rl.startCleanup()
	return rl
}

// startCleanup は未使用のリミッターを定期的に削除します
func (rl *RateLimiter) startCleanup() {
	go func() {
		ticker := time.NewTicker(cleanupInterval)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				rl.mu.Lock()
				for ip, limiter := range rl.ips {
					if time.Since(limiter.lastHit) > limiterTimeout {
						delete(rl.ips, ip)
					}
				}
				rl.mu.Unlock()
			case <-rl.done:
				return
			}
		}
	}()
}

// Stop はクリーンアップ処理を停止します
func (rl *RateLimiter) Stop() {
	close(rl.done)
}

func (rl *RateLimiter) getLimiter(ip string) *rate.Limiter {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	limiterWithTime, exists := rl.ips[ip]
	if !exists {
		limiterWithTime = &rateLimiterWithTime{
			limiter: rate.NewLimiter(rl.rate, rl.burst),
			lastHit: time.Now(),
		}
		rl.ips[ip] = limiterWithTime
	} else {
		limiterWithTime.lastHit = time.Now() // 最終アクセス時間を更新
	}

	return limiterWithTime.limiter
}

func RateLimit() gin.HandlerFunc {
	// 毎秒のレート制限に修正
	limiter := NewRateLimiter(rate.Limit(defaultRequestsPerMinute/60), defaultBurst)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		if !limiter.getLimiter(ip).Allow() {
			c.JSON(http.StatusTooManyRequests, RateLimitError{
				Error: errRateLimitExceeded,
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

// # テスト用
// 連続リクエストを送信
// for i in {1..70}; do
//     curl -i http://localhost:8000/api/health
//     echo "Request $i"
//     sleep 0.1
// done
