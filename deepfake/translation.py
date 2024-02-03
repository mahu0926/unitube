import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "refined-network-320317-cdee89864c6c.json"

from google.cloud import translate_v2 as translate
from google.cloud import speech_v1p1beta1 as speech
import io

def transcribe_video(audio_file_path):
    client = speech.SpeechClient()

    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))

def translate_text(text, target_language='en'):
    # Create a Translate client
    translate_client = translate.Client()

    # Use the translate method to perform text translation
    result = translate_client.translate(text, target_language=target_language)

    # Print the translation
    print(f'Text: {text}')
    print(f'Translation in {target_language}: {result["translatedText"]}')

# Replace 'path/to/your/audio/file.wav' with the path to your audio file
transcribe_video("path/to/your/audio/file.wav")
translate_text("hello my name is john", target_language='es')

