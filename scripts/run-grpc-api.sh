#!/usr/bin/env bash
set -euo pipefail

echo 'Creating database...'
python3 -m app.services.implementations.database.db -create

echo 'Running database migrations...'
alembic upgrade head

echo 'Starting grpc api...'
make run-grpc-api