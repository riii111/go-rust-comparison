APP_SERVICE_NAME = app
RUN_APP = docker compose exec $(APP_SERVICE_NAME)

prepare:
	docker compose up -d --build

build:
	docker compose build

up-d:
	docker compose up -d

up:
	docker compose up

down:
	docker compose down -v

app:
	docker exec -it $(APP_SERVICE_NAME) bash

db:
	docker exec -it db bash

format:
	$(RUN_APP) go fmt ./...
	$(RUN_APP) goimports -l -w .

lint:
	$(RUN_APP) golangci-lint run

tidy:
	$(RUN_APP) go mod tidy

check: format lint tidy
	@echo "All checks passed!"

# 全てのテストを実行
test:
	docker exec -it $(APP_SERVICE_NAME) go test -v ./tests/...

# シャッフルを有効にしてテストを実行
test-shuffle:
	docker exec -it $(APP_SERVICE_NAME) go test -v ./tests/... -shuffle=on

migrate:
	docker exec -it $(APP_SERVICE_NAME) go run ./internal/infrastructure/db/migrations/migration.go

.PHONY: seed
seed:
	docker exec -it $(APP_SERVICE_NAME) go run ./cmd/seed/seed.go
