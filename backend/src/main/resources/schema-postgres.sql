DROP TABLE IF EXISTS files;
CREATE TABLE files(id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    size BIGINT,
    data BYTEA
);
