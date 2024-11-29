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
	docker-compose exec app go fmt
	docker-compose exec app goimports -l -w .
