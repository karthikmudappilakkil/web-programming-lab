import os
import sqlite3

from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
DATABASE = os.path.join(os.path.dirname(__file__), "employees.db")


def create_database():
    connection = sqlite3.connect(DATABASE)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS employees ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT NOT NULL, email TEXT NOT NULL, "
        "department TEXT NOT NULL, salary REAL NOT NULL)"
    )
    connection.commit()
    connection.close()


def get_employees(search_text):
    connection = sqlite3.connect(DATABASE)

    if search_text:
        employees = connection.execute(
            "SELECT id, name, email, department, salary FROM employees "
            "WHERE name LIKE ? OR CAST(id AS TEXT) = ? ORDER BY id",
            ("%" + search_text + "%", search_text)
        ).fetchall()
    else:
        employees = connection.execute(
            "SELECT id, name, email, department, salary FROM employees ORDER BY id"
        ).fetchall()

    connection.close()
    return employees


@app.route("/", methods=["GET", "POST"])
def home():
    message = ""

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        department = request.form.get("department", "").strip()
        salary_text = request.form.get("salary", "").strip()

        try:
            salary = float(salary_text)
            if not name or not email or not department or salary < 0:
                raise ValueError
        except ValueError:
            message = "Enter all employee details and a valid non-negative salary."
            employees = get_employees("")
            return render_template(
                "index.html", employees=employees, edit_employee=None,
                search_text="", message=message
            )

        connection = sqlite3.connect(DATABASE)
        connection.execute(
            "INSERT INTO employees (name, email, department, salary) "
            "VALUES (?, ?, ?, ?)",
            (name, email, department, salary)
        )
        connection.commit()
        connection.close()
        return redirect(url_for("home"))

    search_text = request.args.get("search", "").strip()
    employees = get_employees(search_text)
    return render_template(
        "index.html", employees=employees, edit_employee=None,
        search_text=search_text, message=message
    )


@app.route("/edit/<int:employee_id>", methods=["GET", "POST"])
def edit(employee_id):
    connection = sqlite3.connect(DATABASE)

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        department = request.form.get("department", "").strip()
        salary_text = request.form.get("salary", "").strip()

        try:
            salary = float(salary_text)
            if not name or not email or not department or salary < 0:
                raise ValueError
        except ValueError:
            connection.close()
            return redirect(url_for("edit", employee_id=employee_id))

        connection.execute(
            "UPDATE employees SET name = ?, email = ?, department = ?, salary = ? "
            "WHERE id = ?",
            (name, email, department, salary, employee_id)
        )
        connection.commit()
        connection.close()
        return redirect(url_for("home"))

    edit_employee = connection.execute(
        "SELECT id, name, email, department, salary FROM employees WHERE id = ?",
        (employee_id,)
    ).fetchone()
    connection.close()
    employees = get_employees("")
    return render_template(
        "index.html", employees=employees, edit_employee=edit_employee,
        search_text="", message=""
    )


@app.route("/delete/<int:employee_id>", methods=["POST"])
def delete(employee_id):
    connection = sqlite3.connect(DATABASE)
    connection.execute("DELETE FROM employees WHERE id = ?", (employee_id,))
    connection.commit()
    connection.close()
    return redirect(url_for("home"))


create_database()

if __name__ == "__main__":
    app.run(debug=True)
