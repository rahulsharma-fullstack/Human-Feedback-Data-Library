import psycopg2
from psycopg2 import sql
import pandas as pd
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

# Google Sheets API setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'humanfeedbackdataentries-f2bf391f9c56.json'
SPREADSHEET_ID = '1zcoxCclwMHbNnhK2TmQpvRBYbIlokzjIwI47-JXne3k'
RANGE_NAME = 'Form Responses 1!A:K'

creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=creds)

# Fetch data from Google Sheet
sheet = service.spreadsheets()
result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
values = result.get('values', [])
headers = values[0]
rows = values[1:]
df = pd.DataFrame(rows, columns=headers)

# Process columns for database insertion using column indices
# Combine tags from columns 4 (index 4) and 5 (index 5)
df['Tags'] = df.apply(
    lambda row: row.iloc[4] if pd.isnull(row.iloc[5]) or row.iloc[5] == ''
    else row.iloc[5] if pd.isnull(row.iloc[4]) or row.iloc[4] == ''
    else row.iloc[4] + ',' + row.iloc[5], axis=1
)
df['Tags'] = df['Tags'].fillna('').str.strip()
df['Tags'] = df['Tags'].apply(lambda x: ','.join(set(tag.strip() for tag in x.split(','))))

# Rename columns by index for database compatibility
df.rename(columns={
    df.columns[1]: 'Link',             # Column 2 -> Link
    df.columns[2]: 'Name',             # Column 3 -> Name
    df.columns[3]: 'Description',      # Column 4 -> Description
    df.columns[6]: 'Data Format',      # Column 7 -> Data Format
    df.columns[7]: 'Data size (mb)',   # Column 8 -> Data size
    df.columns[8]: 'Number of Rows',   # Column 9 -> Number of Rows
    df.columns[9]: 'Date posted',      # Column 10 -> Date posted
    df.columns[10]: 'Language'         # Column 11 -> Language
}, inplace=True)

# Convert data types
df['Data size (mb)'] = df['Data size (mb)'].fillna(0).astype(float)
df['Number of Rows'] = df['Number of Rows'].fillna(0).astype(int)
df['Date posted'] = pd.to_datetime(df['Date posted'], errors='coerce')

print(df)
# Define database connection parameters
db_params = {
    'dbname': 'feedback',
    'user': 'feedback',
    'password': 'letmein888',
    'host': 'localhost',
    'port': '5432'
}

try:
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    for _, row in df.iterrows():
        tags_array = '{' + ','.join(tag.strip() for tag in row['Tags'].split(',')) + '}'
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
            row['Data size (mb)'],
            row['Number of Rows'],
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
