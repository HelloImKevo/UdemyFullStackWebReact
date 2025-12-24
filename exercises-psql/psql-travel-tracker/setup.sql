-- Create the database (if it doesn't exist)
-- Note: You cannot run CREATE DATABASE inside a transaction block or while connected to the database you are creating.
-- You might need to connect to 'postgres' database first to run this command:
-- CREATE DATABASE world;

-- Connect to the world database before running the following:

-- Create the visited_countries table
CREATE TABLE IF NOT EXISTS visited_countries (
    id SERIAL PRIMARY KEY,
    country_code CHAR(2) NOT NULL UNIQUE
);

-- Insert some sample data
INSERT INTO visited_countries (country_code) VALUES ('US'), ('GB'), ('FR');

CREATE TABLE IF NOT EXISTS world_food (
    id SERIAL PRIMARY KEY,
    country VARCHAR(45) NOT NULL UNIQUE,
    rice_production FLOAT NOT NULL,
    wheat_production FLOAT NOT NULL
);

INSERT INTO world_food (country, rice_production, wheat_production)
VALUES ('Italy', 1.46, 7.3);

CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    country_code CHAR(2) NOT NULL UNIQUE,
    country_name VARCHAR(100) NOT NULL UNIQUE
);
