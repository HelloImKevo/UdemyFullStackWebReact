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
