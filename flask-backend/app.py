from flask import Flask, request, jsonify
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
    language = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/upload', methods=['POST'])
def upload():
    language='en'
    if 'video' in request.files:
        video = request.files['video']
        filename = secure_filename(video.filename)
        upload_path = os.path.join(app.config['UPLOADED_VIDEOS_DEST'], language, filename)
        os.makedirs(os.path.dirname(upload_path), exist_ok=True)
        video.save(upload_path)
        new_video = Video(name=filename, filename=filename, language=language)
        db.session.add(new_video)
        db.session.commit()
        return 'Video uploaded and saved in database'
    return 'No video uploaded'

@app.route('/videos', methods=['GET'])
def get_videos():
    videos = Video.query.all()
    video_list = []
    for video in videos:
        video_list.append({
            'id': video.id,
            'name': video.name,
            'filename': video.filename
        })
    return jsonify(video_list)


if __name__ == '__main__':
    app.run(debug=True)