FROM golang:1.23.3

WORKDIR /usr/local/go/src/go_rust_comparison/

# airをインストールし、コンテナ起動時にホットリロードできるよう実行する
RUN go install github.com/cosmtrek/air@v1.42.0

# プロジェクトのソースコードをコンテナにコピー
COPY . .

RUN go mod download

CMD ["air"]