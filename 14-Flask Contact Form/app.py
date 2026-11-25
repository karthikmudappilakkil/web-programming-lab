import os
import re
import sqlite3

from flask import Flask, render_template, request

app = Flask(__name__)
DATABASE = os.path.join(os.path.dirname(__file__), "contact.db")


def create_database():
    connection = sqlite3.connect(DATABASE)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS messages ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL)"
    )
    connection.commit()
    connection.close()


@app.route("/", methods=["GET", "POST"])
def contact():
    message = ""
    message_type = "error"

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        text = request.form.get("message", "").strip()

        if not name or not email or not text:
            message = "Please fill in every field."
        elif not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
            message = "Please enter a valid email address."
        elif len(text) > 2000:
            message = "The message must be 2000 characters or fewer."
        else:
            connection = sqlite3.connect(DATABASE)
            connection.execute(
                "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
                (name, email, text)
            )
            connection.commit()
            connection.close()
            message = "Thank you. Your message has been saved."
            message_type = "success"

    return render_template(
        "index.html", message=message, message_type=message_type
    )


create_database()

if __name__ == "__main__":
    app.run(debug=True)
