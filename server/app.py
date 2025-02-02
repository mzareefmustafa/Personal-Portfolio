import os
import base64
from flask import Flask, request, jsonify, render_template
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import traceback

app = Flask(__name__, static_folder="static", template_folder="templates")

print(os.getcwd())  # To print current working directory

# Gmail API Configuration
CLIENT_SECRET_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'client_secret.json')
SCOPES = ['https://www.googleapis.com/auth/gmail.send']  # Scopes for Gmail send functionality

# Function to get Gmail API credentials
def get_gmail_credentials():
    creds = None
    # Check if token.json exists
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    # If no valid credentials, trigger OAuth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRET_FILE,
                SCOPES
            )
            creds = flow.run_local_server(
                port=8080,
                prompt='consent',
                authorization_prompt_message=''
            )

        # Save the new credentials to token.json
        with open('token.json', 'w') as token_file:
            token_file.write(creds.to_json())

    return creds

# Route for serving the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Route for handling contact form submissions
@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        # Parse the request JSON
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message_content = data.get('message')

        # Validate required fields
        if not name or not email or not message_content:
            return jsonify({'error': 'All fields are required'}), 400

        # Compose the email content
        email_body = f"""\
From: {name} <{email}>
To: mzareefmustafa@gmail.com
Subject: New Contact Form Submission

Name: {name}
Email: {email}
Message: {message_content}
"""
        print(f"Name: {name}, Email: {email}, Message: {message_content}")
        
        # Encode email content in base64
        raw_email = base64.urlsafe_b64encode(email_body.encode('utf-8')).decode('utf-8')
        print(f"Encoded email: {raw_email}")
        
        # Use Gmail API to send the email
        creds = get_gmail_credentials()
        service = build('gmail', 'v1', credentials=creds)
        message = {'raw': raw_email}
        service.users().messages().send(userId='me', body=message).execute()

        return jsonify({'success': 'Message sent successfully!'}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Failed to send message: {str(e)}'}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
