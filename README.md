# 🌍 Mohammed Zareef-Mustafa | Personal Portfolio

A **modern, full-stack portfolio website** showcasing my **projects, skills, and contact info**. Built with **Flask, HTML, CSS, and JavaScript**, it includes email verification, a dynamic contact form, and a sleek UI.

Access the site [here](https://mzareefmustafa.com)

## 🚀 Features

- **🖥️ Responsive Design** – Works on all screen sizes.
- **📬 Email Verification** – Users verify their email before sending a message.
- **📡 Flask Backend** – Handles form submissions and email integration.
- **📧 Gmail API Support** – Secure email sending with OAuth.

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask (Python)
- **APIs:** Gmail API (OAuth2)

---

## 📂 Project Structure

```
personal-portfolio/
  └── .vscode/
      ├── settings.json
  └── docs/
      ├── assets/
      ├── index.html
      ├── script.js
      └── style.css
  └── server/
      ├── static/
      │   ├── assets/
      │   ├── script.js
      │   └── style.css
      ├── templates/
      │   └── index.html
      ├── venv/
      ├── app.py
      ├── client_secret.json
      ├── test_oauth.py
      └── token.json
  └── test/
      ├── test_gmail_api.py
      └── test_oauth.py
  └── .gitignore
  └── LICENSE.txt
  └── README.md

```

## 🛠 Setup & Run

1️⃣ **Clone the repo**

```sh
git clone https://github.com/mzareefmustafa/personal-portfolio.git
cd personal-portfolio/server
```

2️⃣ **Set up a virtual environment**

```sh
python3 -m venv venv

source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

3️⃣ **Install dependencies**

```sh
pip install -r requirements.txt
```

4️⃣ **Run the Flask server**

```sh
python app.py
```

5️⃣ **Display in browser**

In your browser, Visit http url provided by the terminal.

6️⃣ **Optional: Enable Contact Section**

```
    1. In script.js, set DISABLE_CONTACT_SECTION to false.
    2. Uncomment all the code in app.py.
    3. Create your own Gmail API OAuth 2.0 and download the client_secret.json file it provides.
    4. Place client_secret.json in the server/ directory.
    5. Update app.py with your personal information and Gmail API credentials.
    6. Run python app.py while in the server/ directory.
    7. In your browser, visit the HTTP URL provided by the terminal.
    8. Test the contact section functionality by sending yourself a message.
```

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE.txt](LICENSE.txt) file for details.
