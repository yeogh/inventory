CREATE DATABASE inventory;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(50) NOT NULL,
    permission VARCHAR(5) NOT NULL,

);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(30) NOT NULL,
    size VARCHAR(3) NOT NULL,
    option VARCHAR(20),
    quantity INT NOT NULL,
    quantity_optimal INT NOT NULL,
    created_by SERIAL NOT NULL,
    quantity_sold INT DEFAULT 0,

    FOREIGN KEY (created_by)
        REFERENCES users (user_id)
)

CREATE TABLE sales(
    sales_id SERIAL PRIMARY KEY,
    quantity_sold INT NOT NULL,
    date TIMESTAMP (255) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_id SERIAL NOT NULL,
    
    FOREIGN KEY (product_id)
        REFERENCES products (product_id)
);

