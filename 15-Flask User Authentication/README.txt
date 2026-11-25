Experiment 15 - User Authentication with Flask

Aim:
To register and log in users with SQLite, hashed passwords and Flask sessions.

Basic algorithm:
1. Create a users table with a unique email and password hash.
2. On registration, validate the fields and hash the password before saving it.
3. On login, find the account and compare the password with its stored hash.
4. Save the user ID and name in the session after successful login.
5. Require a session to open the dashboard; clear it when logging out.

Important concepts:
Flask routes, forms, SQLite, validation, parameterized SQL, password hashing and sessions.

How to execute:
Open Terminal in this folder and run:
  python3 -m pip install -r requirements.txt
  python3 app.py
Open http://127.0.0.1:5000 in a browser. The users.db file is created automatically.
Stop the server with Ctrl+C.

Expected output:
Users can register, log in, view a protected dashboard and log out. Passwords are
stored as hashes, not plain text. Change the example secret key before real deployment.
This lab example uses Flask's local development server, not a production server.
