FROM golang:1.23.3

WORKDIR /usr/local/go/src/go_rust_comparison/backend

# airをインストール
RUN go install github.com/cosmtrek/air@v1.42.0

COPY backend/containers/golang/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh
RUN go mod download

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
