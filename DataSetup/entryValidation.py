from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
import requests

# Google Sheets API setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'DataSetup\\humanfeedbackdataentries-f2bf391f9c56.json'
SPREADSHEET_ID = '1zcoxCclwMHbNnhK2TmQpvRBYbIlokzjIwI47-JXne3k'
RANGE_NAME = 'Form Responses 1!A:K'

creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=creds)

# Check link validity
def is_link_valid(link):
    try:
        if not link.lower().startswith("https://"):
            return False
        response = requests.get(link, timeout=5)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

# Fetch data from Google Sheet
sheet = service.spreadsheets()
result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
values = result.get('values', [])

if not values:
    print("No data found.")
else:
    headers = values[0]
    rows = values[1:]
    updated_rows = [headers]  # Keep headers intact
    deleted_rows = []
    delete_requests = []

    # Validate links and construct updated rows
    for i, row in enumerate(rows):
        link = row[1] if len(row) > 1 else ''  # Ensure the link column exists
        if is_link_valid(link):
            updated_rows.append(row)  # Valid row is kept
        else:
            deleted_rows.append({
                "Row": i + 2,  # Account for header row
                "Dataset Name": row[2] if len(row) > 2 else '',  # Ensure dataset name exists
                "Link": link
            })
            # Prepare delete request for this row
            delete_requests.append({
                "deleteDimension": {
                    "range": {
                        "sheetId": 100239705,  # This is subsheet ID
                        "dimension": "ROWS",
                        "startIndex": i + 1,  # Row index (0-based, skipping headers)
                        "endIndex": i + 2    # Delete one row
                    }
                }
            })

    # Log deleted rows
    if deleted_rows:
        print("Deleted rows:")
        for entry in deleted_rows:
            print(f"Row {entry['Row']}: Dataset Name: {entry['Dataset Name']}, Link: {entry['Link']}")

    # Send batchUpdate to delete rows
    if delete_requests:
        batch_body = {"requests": delete_requests}
        service.spreadsheets().batchUpdate(
            spreadsheetId=SPREADSHEET_ID,
            body=batch_body
        ).execute()
        print("Rows deleted successfully.")
