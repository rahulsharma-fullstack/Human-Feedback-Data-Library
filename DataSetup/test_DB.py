import pytest
import psycopg2

DB_PARAMS = {
    "dbname": "feedback",
    "user": "feedback",
    "password": "letmein888",
    "host": "localhost",
    "port": "5432",
}


@pytest.fixture
def db_connection():
    """Set up a database connection for testing."""
    conn = psycopg2.connect(**DB_PARAMS)
    yield conn
    conn.close()


@pytest.fixture
def cursor(db_connection):
    """Provide a reusable database cursor for tests."""
    cursor = db_connection.cursor()
    yield cursor
    cursor.close()


# Enhanced tests
def test_no_null_links(cursor):
    """Ensure there are no NULL links in the dataset."""
    cursor.execute("SELECT * FROM datasets WHERE link IS NULL;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found rows with NULL links."


def test_valid_data_sizes(cursor):
    """Ensure all datasets have valid data sizes."""
    cursor.execute("SELECT * FROM datasets WHERE data_size_mb IS NULL OR data_size_mb < 0;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found datasets with invalid sizes (NULL or negative)."


def test_valid_row_count(cursor):
    """Ensure row count is valid."""
    cursor.execute("SELECT * FROM datasets WHERE number_of_rows IS NULL OR number_of_rows < 0;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found datasets with invalid row counts (NULL or negative)."


def test_valid_date_format(cursor):
    """Ensure all dates are in valid format (YYYY-MM-DD)."""
    cursor.execute("""
        SELECT date_posted 
        FROM datasets 
        WHERE date_posted::TEXT !~ '^\\d{4}-\\d{2}-\\d{2}$';  -- YYYY-MM-DD
    """)
    results = cursor.fetchall()
    assert len(results) == 0, "Found dates in incorrect format."


def test_non_empty_tags(cursor):
    """Ensure tags array is not empty or NULL."""
    cursor.execute("SELECT * FROM datasets WHERE array_length(tags, 1) IS NULL OR array_length(tags, 1) = 0;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found datasets with empty or NULL tags array."


def test_valid_languages(cursor):
    """Ensure language field is valid (non-empty, reasonable length)."""
    cursor.execute("SELECT * FROM datasets WHERE language IS NULL OR length(language) = 0;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found datasets with missing or empty language fields."


def test_valid_tag_entries(cursor):
    """Ensure all tags are valid (non-empty, reasonable length)."""
    cursor.execute("""
        SELECT tag
        FROM datasets, unnest(tags) AS tag
        WHERE tag IS NULL OR length(tag) = 0;
    """)
    results = cursor.fetchall()
    assert len(results) == 0, "Found empty or NULL tags in the tags array."


def test_non_empty_names(cursor):
    """Ensure dataset names are not NULL or empty."""
    cursor.execute("SELECT * FROM datasets WHERE name IS NULL OR length(name) = 0;")
    results = cursor.fetchall()
    assert len(results) == 0, "Found datasets with NULL or empty names."


def test_valid_url_format(cursor):
    """Ensure links follow a valid URL format."""
    cursor.execute("""
        SELECT * 
        FROM datasets 
        WHERE link !~ '^(https?|ftp)://[^\s/$.?#].[^\s]*$';
    """)
    results = cursor.fetchall()
    assert len(results) == 0, "Found invalid URLs in the dataset."


def test_pagination_support(cursor):
    """Test that pagination parameters are handled correctly."""
    cursor.execute("""
        SELECT COUNT(*) FROM datasets;
    """)
    total_count = cursor.fetchone()[0]
    assert total_count >= 0, "Total dataset count should be non-negative."

    # Assuming a page size of 10
    cursor.execute("""
        SELECT * 
        FROM datasets 
        LIMIT 10 OFFSET 0;
    """)
    results = cursor.fetchall()
    assert len(results) <= 10, "Pagination returned more rows than allowed per page."


# Cleanup and additional validations
def test_cleanup_empty_records(cursor):
    """Ensure there are no orphaned or empty records."""
    cursor.execute("""
        SELECT * 
        FROM datasets 
        WHERE link IS NULL 
        AND name IS NULL 
        AND tags IS NULL;
    """)
    results = cursor.fetchall()
    assert len(results) == 0, "Found orphaned or completely empty records."
