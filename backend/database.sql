CREATE DATABASE inventory;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO users (name, password, email) VALUES ('CD Eng', 'example', 'cde@gmail.com');

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    code VARCHAR(10),
    name VARCHAR(30),
    size VARCHAR(3),
    option VARCHAR(20),
    quantity INT4,
    quantity_optimal INT4,
    percent_optimal NUMERIC(5,2),
)