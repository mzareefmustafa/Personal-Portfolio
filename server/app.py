import os
import json
import base64
import secrets
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, render_template
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import traceback
import requests

app = Flask(__name__, static_folder="static", template_folder="templates")

# # Gmail API Configuration
# CLIENT_SECRET_FILE = os.getenv('CLIENT_SECRET_FILE', 'client_secret.json')
# SCOPES = ['https://www.googleapis.com/auth/gmail.send']

# # Store verification codes with expiration timestamps
# verification_codes = {}

# # Authenticate and refresh Gmail API credentials
# def get_gmail_credentials():
#     creds = None
#     token_file_path = os.getenv('TOKEN_JSON', 'token.json')  # Get path from environment variable

#     # Check if the token file exists
#     if os.path.exists(token_file_path):
#         with open(token_file_path, "r") as token_file:
#             creds = Credentials.from_authorized_user_info(json.load(token_file), SCOPES)

#     # If token is expired and refresh token is available, refresh it
#     if creds and creds.expired and creds.refresh_token:
#         try:
#             creds.refresh(Request())
#             # Save refreshed token to file
#             with open(token_file_path, "w") as token_file:
#                 token_file.write(creds.to_json())
#         except Exception as e:
#             print("Token refresh failed:", str(e))
#             return None

#     # If no valid creds, authenticate and generate a new token
#     if not creds or not creds.valid:
#         flow = InstalledAppFlow.from_client_secrets_file(os.getenv('CLIENT_SECRET_FILE', 'client_secret.json'), SCOPES)
#         creds = flow.run_local_server(port=8080, prompt='consent')
#         # Save the new token to a file
#         with open(token_file_path, "w") as token_file:
#             token_file.write(creds.to_json())

#     return creds







# # Send email using Gmail API
# def send_email_message(to_email, subject, body, from_email=None):
#    try:
#        headers = ""
#        if from_email:
#            headers += f"From: {from_email}\r\n"
      
#        headers += f"To: {to_email}\r\nSubject: {subject}\r\n\r\n"
#        email_content = headers + body
#        raw_email = base64.urlsafe_b64encode(email_content.encode('utf-8')).decode('utf-8')
#        creds = get_gmail_credentials()
#        service = build('gmail', 'v1', credentials=creds)
#        message = {'raw': raw_email}
#        service.users().messages().send(userId='me', body=message).execute()
#        return True
#    except Exception as e:
#        print("Error sending email:", e)
#        return False




@app.route('/')
def home():
   return render_template('index.html')


# # Handle contact form submission
# @app.route('/send-message', methods=['POST'])
# def send_message():
#    try:
#        data = request.get_json()
#        name = data.get('name')
#        email = data.get('email')
#        message_content = data.get('message')
#        if not name or not email or not message_content:
#            return jsonify({'error': 'All fields are required'}), 400


#        # Send message to recipient
#        email_subject = "New Contact Form Submission"
#        email_body = f"""\
# Name: {name}
# Email: {email}
# Message: {message_content}
# """
#        recipient = "mzareefmustafa@gmail.com"
#        if not send_email_message(recipient, email_subject, email_body):
#            return jsonify({'error': 'Failed to send message.'}), 500
#        # Send confirmation email to user
#        confirmation_subject = "Your Message Has Been Received"
#        confirmation_body = f"""\
# Hi {name},


# Thank you for reaching out! Your message has been received.


# I will get back to you as soon as possible!


# Here is a copy of your message:
# -------------------------------------
# {message_content}
# -------------------------------------


# Best regards,
# Mohammed Zareef-Mustafa
# """
      
#        if not send_email_message(email, confirmation_subject, confirmation_body, from_email="noreply0864297531@gmail.com"):
#            return jsonify({'error': 'Failed to send confirmation email.'}), 500


#        return jsonify({'success': 'Message sent successfully! A confirmation email has been sent to your inbox.'}), 200
#    except Exception as e:
#        traceback.print_exc()
#        return jsonify({'error': f'Failed to send message: {str(e)}'}), 500


# # Send email verification code
# @app.route('/send-verification-code', methods=['POST'])
# def send_verification_code():
#    try:
#        data = request.get_json()
#        email = data.get('email')
#        if not email:
#            return jsonify({'error': 'Email is required'}), 400
      
#        code = str(secrets.randbelow(900000) + 100000)  # Generate 6-digit code
#        expires_at = datetime.utcnow() + timedelta(minutes=10)
#        # Set attempts to 5 for each email
#        verification_codes[email] = {"code": code, "expires_at": expires_at, "attempts": 5}
#        subject = "Your Verification Code"
#        body = f"Your verification code is: {code}\nThis code is valid for 10 minutes."
      
#        generic_sender = "noreply0864297531@gmail.com"
#        if not send_email_message(email, subject, body, from_email=generic_sender):
#            return jsonify({'error': 'Failed to send verification email.'}), 500
#        return jsonify({'success': 'A verification code has been sent to your email address.'}), 200
#    except Exception as e:
#        traceback.print_exc()
#        return jsonify({'error': f'Error: {str(e)}'}), 500


# # Validate verification code with limited attempts
# @app.route('/validate-verification-code', methods=['POST'])
# def validate_verification_code():
#    try:
#        data = request.get_json()
#        email = data.get('email')
#        code = data.get('code')
#        if not email or not code:
#            return jsonify({'error': 'Email and code are required'}), 400
#        if email not in verification_codes:
#            return jsonify({'error': 'No verification code found for this email'}), 400
      
#        record = verification_codes[email]
#        if datetime.utcnow() > record["expires_at"]:
#            verification_codes.pop(email, None)
#            return jsonify({'error': 'The verification code has expired'}), 400
      
#        if code != record["code"]:
#            # Decrement attempts and check if too many failed attempts
#            record["attempts"] -= 1
#            if record["attempts"] <= 0:
#                verification_codes.pop(email, None)
#                return jsonify({'error': 'Too many failed attempts. Verification code is no longer valid.'}), 400
#            return jsonify({'error': f'Invalid verification code. {record["attempts"]} attempts remaining.'}), 400
      
#        # remove record and return success
#        verification_codes.pop(email, None)
#        return jsonify({'success': 'Email verified successfully!'}), 200
#    except Exception as e:
#        traceback.print_exc()
#        return jsonify({'error': f'Error: {str(e)}'}), 500




if __name__ == '__main__':
   app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))