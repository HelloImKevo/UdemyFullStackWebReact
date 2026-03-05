-- Create the table for storing book notes
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13), -- Used for fetching cover from Open Library API
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    date_read DATE DEFAULT CURRENT_DATE
);

-- Insert some sample data
INSERT INTO books (title, author, isbn, rating, notes, date_read)
VALUES 
('The Pragmatic Programmer', 'Andrew Hunt & David Thomas', '9780201616224', 10, 'A must-read for any software developer. Full of practical advice.', '2023-01-15'),
('Clean Code', 'Robert C. Martin', '9780132350884', 9, 'Great principles for writing readable code.', '2023-02-20'),
('Atomic Habits', 'James Clear', '9780735211292', 8, 'Tiny changes, remarkable results.', '2023-03-10');
