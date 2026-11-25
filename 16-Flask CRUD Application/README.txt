Experiment 16 - CRUD Application with Flask

Aim:
To create, read, update and delete records using Flask and SQLite.

Basic algorithm:
1. Create a records table when the Flask application starts.
2. Display a form and the records already stored in the database.
3. Insert a new record when the add form is submitted.
4. Load a selected record into an update form and save its changes.
5. Delete a selected record when its Delete button is clicked.

Important concepts:
Flask routes, GET and POST, HTML forms, SQLite, parameterized SQL and Jinja templates.

How to execute:
Open Terminal in this folder and run:
  python3 -m pip install -r requirements.txt
  python3 app.py
Open http://127.0.0.1:5000 in a browser. The records.db file is created automatically.
Stop the server with Ctrl+C.

Expected output:
Records can be added, displayed, edited and deleted. The database keeps records between
application runs. This lab example uses Flask's local development server.
