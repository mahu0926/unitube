from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['UPLOADED_VIDEOS_DEST'] = os.path.join(os.path.dirname(__file__), 'db')

db = SQLAlchemy(app)

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    filename = db.Column(db.String(120), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/upload', methods=['POST'])
def upload():
    if 'video' in request.files:
        video = request.files['video']
        filename = secure_filename(video.filename)
        video.save(os.path.join(app.config['UPLOADED_VIDEOS_DEST'], filename))
        new_video = Video(name=filename, filename=filename)
        db.session.add(new_video)
        db.session.commit()
        return 'Video uploaded and saved in database'
    return 'No video uploaded'

if __name__ == '__main__':
    app.run(debug=True)