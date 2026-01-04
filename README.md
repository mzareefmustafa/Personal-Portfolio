# Personal Portfolio Website (Flask)

A professional personal portfolio website built to showcase my **data analytics projects**, technical skills, and contact information. The site serves as a central hub linking my GitHub, projects, and resume, with a clean UI and lightweight backend functionality.

Live site: https://mzareefmustafa.com

## Purpose

This project was built to:

- Present my analytics and technical projects in a polished, accessible format
- Provide a simple and secure way to get in touch
- Demonstrate full-stack fundamentals alongside data-focused work

## Key Features

- Responsive layout for desktop and mobile
- Flask backend to handle routing and form submissions
- Secure email contact workflow using OAuth
- Clean, minimal UI focused on readability and clarity

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Flask (Python)
- APIs: Gmail API (OAuth 2.0)

## Project Structure

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

## Running Locally (Optional)

```bash
git clone https://github.com/mzareefmustafa/personal-portfolio.git
cd personal-portfolio/server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

In your browser, Visit http url provided by the terminal.

## Author

**Mohammed Zareef-Mustafa**

## License

This project is licensed under the **MIT License**. See the [LICENSE.txt](LICENSE.txt) file for details.
