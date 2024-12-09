#!/bin/sh
set -e

go run ./internal/infrastructure/db/migrations/migration.go

exec air -d