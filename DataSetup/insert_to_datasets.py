import csv
import psycopg2
from psycopg2 import sql
import pandas as pd 
# Define your database connection parameters
db_params = {
    'dbname': 'feedback',  # replace with your database name
    'user': 'feedback',          # replace with your username
    'password': 'letmein888',      # replace with your password
    'host': 'localhost',              # or the IP address of your PostgreSQL server
    'port': '5432'                    # default PostgreSQL port
}
path_to_csv = 'data1.csv'
try:
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()
    df = pd.read_csv(path_to_csv)
    df['Name'] = df['Name'].astype(str).fillna('').str.strip()
    df['Name'] = df['Name'].str.replace(r"^'(.*)'$", r'\1', regex=True)
    df['Name'] = df['Name'].apply(lambda x: x.encode('utf-8').decode('ascii', 'ignore'))
    df['Data size (mb)'] = df['Data size (mb)'].fillna(0).astype(str).str.replace(',', '').astype(float)
    df['Number of Rows'] = df['Number of Rows'].fillna(0).astype(str).str.replace(',', '').astype(int)
    df['Date posted'] = pd.to_datetime(df['Date posted'], format='%d/%m/%Y', errors='coerce')
    for index, row in df.iterrows():
        tags_array = row['Tags'].split(',')  # Split the string into a list - doesnt handle na values
        tags_array = [tag.strip() for tag in tags_array]  # Remove any leading/trailing spaces
        tags_array = '{' + ','.join(tags_array) + '}'  # Format as a PostgreSQL array
        date_posted = row['Date posted'].strftime('%Y-%m-%d') if pd.notna(row['Date posted']) else None
        insert_query = sql.SQL('''
            INSERT INTO datasets (link, name, description, tags, data_type, data_size_mb, number_of_rows, date_posted, language)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''')
        cursor.execute(insert_query, (
            row['Link'],
            row['Name'],
            row['Description'],
            tags_array,
            row['Data Format'],
            (row['Data size (mb)']),
            int(row['Number of Rows']),
            date_posted,
            row['Language']
        ))
    conn.commit()
    print("Data inserted successfully.")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()