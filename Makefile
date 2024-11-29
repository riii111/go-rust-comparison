APP_SERVICE_NAME = app
RUN_APP = docker-compose exec $(APP_SERVICE_NAME)

prepare:
	docker-compose up -d --build

build:
	docker-compose build

up-d:
	docker-compose up -d

up:
	docker-compose up

down:
	docker-compose down

format:
	$(RUN_APP) go fmt
	$(RUN_APP) goimports -l -w .

lint:
	$(RUN_APP) golangci-lint run
