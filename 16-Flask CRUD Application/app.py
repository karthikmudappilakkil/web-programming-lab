import os
import sqlite3

from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
DATABASE = os.path.join(os.path.dirname(__file__), "records.db")


def create_database():
    connection = sqlite3.connect(DATABASE)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS records ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "title TEXT NOT NULL, description TEXT NOT NULL)"
    )
    connection.commit()
    connection.close()


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()

        if title and description:
            connection = sqlite3.connect(DATABASE)
            connection.execute(
                "INSERT INTO records (title, description) VALUES (?, ?)",
                (title, description)
            )
            connection.commit()
            connection.close()

        return redirect(url_for("home"))

    connection = sqlite3.connect(DATABASE)
    records = connection.execute(
        "SELECT id, title, description FROM records ORDER BY id DESC"
    ).fetchall()
    connection.close()
    return render_template("index.html", records=records, edit_record=None)


@app.route("/edit/<int:record_id>", methods=["GET", "POST"])
def edit(record_id):
    connection = sqlite3.connect(DATABASE)

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()

        if title and description:
            connection.execute(
                "UPDATE records SET title = ?, description = ? WHERE id = ?",
                (title, description, record_id)
            )
            connection.commit()

        connection.close()
        return redirect(url_for("home"))

    edit_record = connection.execute(
        "SELECT id, title, description FROM records WHERE id = ?",
        (record_id,)
    ).fetchone()
    records = connection.execute(
        "SELECT id, title, description FROM records ORDER BY id DESC"
    ).fetchall()
    connection.close()
    return render_template("index.html", records=records, edit_record=edit_record)


@app.route("/delete/<int:record_id>", methods=["POST"])
def delete(record_id):
    connection = sqlite3.connect(DATABASE)
    connection.execute("DELETE FROM records WHERE id = ?", (record_id,))
    connection.commit()
    connection.close()
    return redirect(url_for("home"))


create_database()

if __name__ == "__main__":
    app.run(debug=True)
