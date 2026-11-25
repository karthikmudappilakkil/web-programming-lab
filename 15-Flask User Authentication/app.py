import os
import re
import sqlite3

from flask import Flask, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = "change-this-secret-key-for-a-real-application"
DATABASE = os.path.join(os.path.dirname(__file__), "users.db")


def create_database():
    connection = sqlite3.connect(DATABASE)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS users ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL)"
    )
    connection.commit()
    connection.close()


def valid_email(email):
    return re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email) is not None


@app.route("/")
def home():
    return render_template("index.html", message="")


@app.route("/register", methods=["POST"])
def register():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")

    if not name or not email or not password:
        return render_template("index.html", message="Please fill in every registration field.")
    if not valid_email(email):
        return render_template("index.html", message="Please enter a valid email address.")
    if len(password) < 6:
        return render_template("index.html", message="Password must be at least 6 characters.")

    connection = sqlite3.connect(DATABASE)
    existing_user = connection.execute(
        "SELECT id FROM users WHERE email = ?", (email,)
    ).fetchone()

    if existing_user:
        connection.close()
        return render_template("index.html", message="That email is already registered.")

    password_hash = generate_password_hash(password, method="pbkdf2:sha256")
    connection.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        (name, email, password_hash)
    )
    connection.commit()
    user_id = connection.execute(
        "SELECT id FROM users WHERE email = ?", (email,)
    ).fetchone()[0]
    connection.close()

    session.clear()
    session["user_id"] = user_id
    session["user_name"] = name
    return redirect(url_for("dashboard"))


@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")

    if not email or not password:
        return render_template("index.html", message="Enter your email and password.")
    if not valid_email(email):
        return render_template("index.html", message="Please enter a valid email address.")

    connection = sqlite3.connect(DATABASE)
    user = connection.execute(
        "SELECT id, name, password_hash FROM users WHERE email = ?", (email,)
    ).fetchone()
    connection.close()

    if user is None or not check_password_hash(user[2], password):
        return render_template("index.html", message="Email or password is incorrect.")

    session.clear()
    session["user_id"] = user[0]
    session["user_name"] = user[1]
    return redirect(url_for("dashboard"))


@app.route("/dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect(url_for("home"))
    return render_template("dashboard.html", name=session["user_name"])


@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return redirect(url_for("home"))


create_database()

if __name__ == "__main__":
    app.run(debug=True)
