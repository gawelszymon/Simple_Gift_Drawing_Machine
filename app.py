from flask import Flask
from flask_cors import CORS
from backend.config import Config
from backend.models import db
from backend.routes import init_routes

app = Flask(__name__, template_folder="./frontend/templates", static_folder='./frontend/static')
app.config.from_object(Config)
CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all(bind_key='db1')

init_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)