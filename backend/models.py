from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Friends(db.Model):
    __bind_key__ = 'db1'
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    friend_name = db.Column(db.String(80), nullable=False)