FROM golang:1.23.3

WORKDIR /usr/local/go/src/go_rust_comparison/backend

# airをインストール
RUN go install github.com/cosmtrek/air@v1.42.0

CMD ["air", "-c", ".air.toml"]