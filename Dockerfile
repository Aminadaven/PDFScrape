FROM eclipse-temurin:latest

ARG port=8080
ARG version
ARG project='pdf-scrape'
ARG jarfile='app'

COPY /build/libs/$project-$version.jar $jarfile.jar

ENTRYPOINT ["java","-jar","/app.jar", "--server.port=$port"]