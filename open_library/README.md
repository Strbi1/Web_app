# README.md 
After starting `docker compose up -d --build` run following command in db docker:
```bash
pg_restore --verbose --clean --no-owner --dbname="$POSTGRES_DB" --username="$POSTGRES_USER" /docker-entrypoint-initdb.d/docker_postgres_init.sql
```