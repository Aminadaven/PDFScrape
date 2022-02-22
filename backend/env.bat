@echo off
if "%1"=="" (color 4
    echo usage: env [postgres-password]
exit /b 1)
color a
setx POSTGRES_HOST localhost /m
setx POSTGRES_PORT 5432 /m
setx POSTGRES_DB files /m
setx POSTGRES_PASSWORD %1 /m
cls