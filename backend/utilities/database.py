import sqlite3
from flask import g, current_app

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(current_app.config['SQLITE_DB'])
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db:
        db.close()

def init_db(app):
    sql_script = ""

    with app.app_context():
        with open(current_app.config['SCHEMA_PATH'], 'r') as sql_file:
            sql_script = sql_file.read()

        db = get_db()
        db.execute(sql_script)
        db.commit()

def set_db_context(app):
    app.teardown_appcontext(close_db)
    init_db(app)