Experiment 17 - Employee Management System

Aim:
To add, view, update, delete and search employee records using Flask and SQLite.

Basic algorithm:
1. Create an employees table with name, email, department and salary fields.
2. Display a form to add an employee and a list of saved employees.
3. Insert new details into the database after checking the required values.
4. Load and save changed details when an employee is edited.
5. Delete an employee when Delete is selected.
6. Search employees by name or employee ID.

Important concepts:
Flask routes, HTML forms, SQLite, CRUD operations, SQL search, validation and templates.

How to execute:
Open Terminal in this folder and run:
  python3 -m pip install -r requirements.txt
  python3 app.py
Open http://127.0.0.1:5000 in a browser. The employees.db file is created automatically.
Stop the server with Ctrl+C.

Expected output:
Employee details can be added, listed, edited, deleted and searched by name or ID.
Records remain in SQLite between application runs. This lab example uses Flask's
local development server.
