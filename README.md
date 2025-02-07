# 🌍 Mohammed Zareef-Mustafa | Personal Portfolio

A **modern, full-stack portfolio website** showcasing my **projects, skills, and contact info**. Built with **Flask, HTML, CSS, and JavaScript**, it includes email verification, a dynamic contact form, and a sleek UI.

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

Visit http://127.0.0.1:5000 in your browser.
