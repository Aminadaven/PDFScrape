FROM eclipse-temurin:latest

ARG version
ARG project=pdf-scrape

COPY /build/libs/${project}-${version}.jar app.jar

ENTRYPOINT java -jar /app.jar