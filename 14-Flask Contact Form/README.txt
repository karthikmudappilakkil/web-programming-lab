Experiment 14 - Flask Contact Form

Aim:
To send contact form data to a Flask backend and save it in an SQLite database.

Basic algorithm:
1. Start the Flask application and create the messages table if needed.
2. Display a form for name, email and message.
3. Receive the submitted fields in a Flask POST route.
4. Check that the fields are filled and the email format is valid.
5. Insert valid data into SQLite and display a confirmation message.

Important concepts:
Flask routes, GET and POST, HTML forms, form validation, SQLite and parameterized SQL.

How to execute:
Open Terminal in this folder and run:
  python3 -m pip install -r requirements.txt
  python3 app.py
Open http://127.0.0.1:5000 in a browser. The contact.db file is created automatically.
Stop the server with Ctrl+C.

Expected output:
A contact form appears. A valid submission is saved in SQLite and a confirmation
message is shown. This learning example uses Flask's local development server.
