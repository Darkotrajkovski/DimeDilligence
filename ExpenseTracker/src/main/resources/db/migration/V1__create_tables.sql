CREATE TABLE currency
(
    owner_id                     SERIAL PRIMARY KEY,
    reference_currency  VARCHAR(5)
);

CREATE TABLE user_table
(
    id                        SERIAL PRIMARY KEY,
    name                      VARCHAR(50) NOT NULL,
    surname                   VARCHAR(50) NOT NULL,
    email                     VARCHAR(50) NOT NULL,
    password                  VARCHAR(1000) NOT NULL,
    role                      VARCHAR(10) NOT NULL
);


CREATE TABLE income
(
    id                        SERIAL PRIMARY KEY,
    owner_id                  BIGINT      NOT NULL,
    amount                    BIGINT        NOT NULL,
    currency                  VARCHAR(5) NOT NULL,
    description               VARCHAR(50),
    place                     VARCHAR(30),
    comment                   VARCHAR(50),
    date                      DATE        NOT NULL,
    category                  VARCHAR(15)      NOT NULL
);

CREATE TABLE expense
(
    id                        SERIAL PRIMARY KEY,
    owner_id                  BIGINT      NOT NULL,
    amount                    BIGINT        NOT NULL,
    currency                  VARCHAR(5) NOT NULL,
    description               VARCHAR(50),
    place                     VARCHAR(30),
    comment                   VARCHAR(50),
    date                      DATE        NOT NULL,
    category                  VARCHAR(15)      NOT NULL
);

CREATE TABLE goal
(
    id                        SERIAL PRIMARY KEY,
    owner_id                  BIGINT      NOT NULL,
    amount                    BIGINT        NOT NULL,
    currency                  VARCHAR(5) NOT NULL,
    description               VARCHAR(50),
    date                      DATE        NOT NULL,
    category                  VARCHAR(30)      NOT NULL
);