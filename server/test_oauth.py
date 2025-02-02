import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials

CLIENT_SECRET_FILE = 'client_secret.json'
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def test_oauth_flow():
    creds = None

    # Check if token.json exists
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    # Trigger the OAuth flow if token.json doesn't exist
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            creds = flow.run_local_server(port=8080)  # Should open the browser

        # Save the credentials to token.json
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    print("OAuth flow complete. Credentials saved in token.json.")

if __name__ == "__main__":
    test_oauth_flow()
