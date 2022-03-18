FROM azul/zulu-openjdk-alpine:17 as packager

COPY "build/libs/backend-0.0.1-SNAPSHOT.jar" "/app.jar"

RUN apk add binutils # for objcopy, needed by jlink

ENV JAVA_MINIMAL=/opt/jre

# build modules distribution
RUN jdeps --print-module-deps --ignore-missing-deps app.jar > java.modules

# For more help about the modules required:
# https://stackoverflow.com/questions/53669151/java-11-application-as-lightweight-docker-image
RUN jlink \
    --verbose \
    --module-path $JAVA_HOME/lib \
    --add-modules \
        java.base,java.sql,java.naming,java.desktop,java.management,java.security.jgss,java.instrument,$(cat java.modules) \
#    ALL-MODULE-PATH \
    --compress 2 \
    --strip-debug \
    --no-header-files \
    --no-man-pages \
    --output "$JAVA_MINIMAL"

# Second stage, add only our minimal "JRE" distr and our app
FROM alpine:3.15 as production

ENV JAVA_MINIMAL=/opt/jre
ENV PATH="$PATH:$JAVA_MINIMAL/bin"

COPY --from=packager "$JAVA_MINIMAL" "$JAVA_MINIMAL"
COPY --from=packager app.jar .

RUN apk update \
 && apk add fontconfig \
 && apk add ttf-dejavu
RUN ln -s /usr/lib/libfontconfig.so.1 /usr/lib/libfontconfig.so && \
    ln -s /lib/libuuid.so.1 /usr/lib/libuuid.so.1 && \
    ln -s /lib/libc.musl-x86_64.so.1 /usr/lib/libc.musl-x86_64.so.1
ENV LD_LIBRARY_PATH /usr/lib

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]