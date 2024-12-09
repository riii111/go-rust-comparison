FROM golang:1.23.3

WORKDIR /usr/local/go/src/go_rust_comparison/

RUN go install github.com/cosmtrek/air@v1.42.0

COPY backend/. /usr/local/go/src/go_rust_comparison/
COPY containers/golang/entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh
RUN go mod download