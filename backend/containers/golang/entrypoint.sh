#!/bin/sh
set -eu

go run ./internal/infrastructure/db/migrations/migration.go

exec air -c .air.toml -d
