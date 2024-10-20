CREATE TABLE Datasets (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each dataset
    link TEXT NOT NULL,  -- Stores the hyperlink as text
    description TEXT,  -- Description of the dataset
    tags TEXT[],  -- Array of strings to store tags
    data_type TEXT,  -- Description of the data type
    data_size_mb NUMERIC(10, 3),  -- Size of the dataset in megabytes, allowing for decimals
    number_of_rows INTEGER,  -- Integer field for the number of rows in the dataset
    date_posted DATE,  -- Date when the dataset was posted
    language TEXT  -- Language name
);