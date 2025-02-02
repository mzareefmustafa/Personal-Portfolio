from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# Define the required Gmail API scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def test_gmail_credentials():
    try:
        # Load credentials from token.json
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

        # Build the Gmail API service
        service = build('gmail', 'v1', credentials=creds)

        # Make a test API call to get the authenticated user's profile
        profile = service.users().getProfile(userId='me').execute()

        # Print the authenticated Gmail address to verify
        print("Gmail API is working. Email:", profile['emailAddress'])

    except Exception as e:
        print("Error with Gmail API credentials:", str(e))

# Run the test function
if __name__ == "__main__":
    test_gmail_credentials()
