--
DROP DATABASE IF EXISTS meu_bazar_online;
CREATE DATABASE meu_bazar_online;
USE meu_bazar_online;
--
CREATE TABLE meu_bazar_online.address (
    id               CHAR(36) NOT NULL,
    zip_code         VARCHAR(20),
    street_name      VARCHAR(255),
    street_number    VARCHAR(255),
    complement       VARCHAR(255),
    city             VARCHAR(255),
    state            VARCHAR(255),
    country          VARCHAR(255),
    CONSTRAINT pk_address PRIMARY KEY (id)
);
--
CREATE TABLE meu_bazar_online.user (
    id         CHAR(36) NOT NULL,
    address_id CHAR(36),
    user_name  VARCHAR(255) NOT NULL,
    full_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(255),
    birthday   VARCHAR(255),
    password   VARCHAR(255) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id),
    CONSTRAINT fk_user_address FOREIGN KEY (address_id) REFERENCES meu_bazar_online.address(id)
);
--
CREATE TABLE meu_bazar_online.user_token (
    id         CHAR(36) NOT NULL,
    user_id    CHAR(36) NOT NULL,
    date_time  VARCHAR(20) NOT NULL,
    expiration VARCHAR(20) NOT NULL,
    token      CHAR(36) NOT NULL,
    CONSTRAINT pk_user_token PRIMARY KEY (id),
    CONSTRAINT fk_user_token_user FOREIGN KEY (user_id) REFERENCES meu_bazar_online.user(id)
);
--
CREATE TABLE meu_bazar_online.customer (
    id               CHAR(36) NOT NULL,
    user_id          CHAR(36) NOT NULL,
    address_id       CHAR(36) NOT NULL,
    created          VARCHAR(20) NOT NULL,
    updated          VARCHAR(20),
    picture          VARCHAR(255),
    birthday         VARCHAR(10),
    full_name        VARCHAR(255),
    phone            VARCHAR(30),
    person_type      VARCHAR(2),
    document_type    VARCHAR(10),
    document_number  VARCHAR(255),
    email            VARCHAR(255),
    active           TINYINT,
    favorite         TINYINT,
    CONSTRAINT pk_customer PRIMARY KEY (id),
    CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES meu_bazar_online.user(id),
    CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES meu_bazar_online.address(id),
    CONSTRAINT ch_customer_person_type CHECK (person_type IS NULL OR person_type = 'PF' OR person_type = 'PJ'),
    CONSTRAINT ch_customer_document_type CHECK (document_type IS NULL OR document_type = 'CPF' OR document_type = 'RG' OR document_type = 'CNPJ')
);
--
CREATE TABLE meu_bazar_online.product (
    id               CHAR(36) NOT NULL,
    user_id          CHAR(36) NOT NULL,
    seller_id        CHAR(36),
    code             CHAR(36),
    created          VARCHAR(20) NOT NULL,
    updated          VARCHAR(20),
    title            VARCHAR(255) NOT NULL,
    description      BLOB,
	categories       VARCHAR(255),
	price            BIGINT,
    status           VARCHAR(255) NOT NULL DEFAULT 'AVAILABLE',
    CONSTRAINT pk_product PRIMARY KEY (id),
    CONSTRAINT un_product_code UNIQUE KEY (code, user_id),
    CONSTRAINT fk_product_user FOREIGN KEY (user_id) REFERENCES meu_bazar_online.user(id),
    CONSTRAINT fk_product_seller FOREIGN KEY (seller_id) REFERENCES meu_bazar_online.customer(id),
    CONSTRAINT ch_product_status CHECK (status IN ('AVAILABLE', 'RESERVED', 'SOLD', 'UNAVAILABLE', 'BLOCKED'))
);
--
CREATE TABLE meu_bazar_online.product_waiting_list (
    id               BIGINT NOT NULL AUTO_INCREMENT,
    product_id       CHAR(36) NOT NULL,
    customer_id      CHAR(36) NOT NULL,
    created          VARCHAR(20) NOT NULL,
    CONSTRAINT pk_product_waiting_list PRIMARY KEY (id),
    CONSTRAINT fk_product_waiting_list_product FOREIGN KEY (product_id) REFERENCES meu_bazar_online.product(id),
    CONSTRAINT fk_product_waiting_list_customer FOREIGN KEY (customer_id) REFERENCES meu_bazar_online.customer(id)
);
--
INSERT INTO meu_bazar_online.user (
  id,
  full_name,
  user_name,
  email,
  phone,
  password
) VALUES (
  "ded70669-8118-4ad1-ae6f-67f09ccd808b",
  "Michel Douglas Grigoli",
  "michel005",
  "mdgrigoli@hotmail.com.br",
  "(44) 99129-9291",
  "thmpv005"
)
--
