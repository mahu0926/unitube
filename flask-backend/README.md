# Flask Video Processing Application

This application is a Flask backend that allows users to upload videos, which are then processed and stored in a SQLite database.

## Installation

1. Create a new conda environment called unitube:
    ```bash
    conda create --name unitube
    ```

2. Activate the unitube environment:
    ```bash
    conda activate unitube
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the application:
    ```bash
    python app.py
    ```

## Usage

To upload a video, send a POST request to the `/upload` endpoint with the video file included in the form data.

## Features

- Video upload: Users can upload videos to the server.
- Video processing: Uploaded videos are processed using OpenCV.
- Video storage: Processed videos are stored in a SQLite database.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the MIT license.