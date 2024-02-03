import os
import requests

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "refined-network-320317-cdee89864c6c.json"
from moviepy.editor import VideoFileClip
from pydub import AudioSegment

def convert_video_to_wav(input_video, output_wav):
    try:
        # Load the video clip
        video_clip = VideoFileClip(input_video)

        # Extract audio from the video clip
        audio_clip = video_clip.audio

        # Write the audio to a WAV file
        audio_clip.write_audiofile(output_wav, codec='pcm_s16le')

        print(f"Conversion successful. WAV file saved at {output_wav}")

    except Exception as e:
        print(f"Error: {e}")

from google.cloud import translate_v2 as translate
from google.cloud import speech_v1p1beta1 as speech
import io

def convert_stereo_to_mono(input_file, output_file):
    audio = AudioSegment.from_wav(input_file)
    mono_audio = audio.set_channels(1)
    mono_audio.export(output_file, format="wav")

def translate_text(text, target_language='es'):
    # Create a Translate client
    translate_client = translate.Client()

    # Use the translate method to perform text translation
    result = translate_client.translate(text, target_language=target_language)

    # Print the translation
    # print(f'Text: {text}')
    # print(f'Translation in {target_language}: {result["translatedText"]}')
    return result["translatedText"]

def transcribe_video(audio_file_path, target_language='es'):
    client = speech.SpeechClient()
    audio_frame_rate =  AudioSegment.from_wav(audio_file_path).frame_rate
    # print(f"Sample rate: {audio.frame_rate} Hz")

    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=audio_frame_rate,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    result_transcript = ""
    for result in response.results:
        translation = translate_text(result.alternatives[0].transcript, target_language)
        # print("Transcript: {}".format(translation))
        result_transcript += str(translation)
    return result_transcript

def video_text_to_speech(video_path, text, file_name, target_language):
    url = "https://f259-104-196-141-29.ngrok-free.app/video-text-to-speech"

    # The file you want to upload
    files = {
        'video': ('filename.mp4', open(video_path, 'rb'), 'video/mp4')
    }

    # Any additional data you want to send with the file
    data = {
        'translation': text,
        'language': target_language
    }

    response = requests.get(url, files=files, data=data)
    print(response.status_code)
    output_file_path = os.path.join('videos/output_videos', file_name)
    if response.status_code == 200:
        with open(output_file_path, 'wb') as output_file:
            output_file.write(response.content)
        print(f"Video downloaded successfully to {output_file_path}")
    else:
        print(f"Error: {response.status_code}")

file_name = 'video1594907834.mp4'
file_path = os.path.join('videos/input_videos', file_name)
file_name_wo_ext, file_extension = os.path.splitext(file_name)
wav_file = file_name_wo_ext + '.wav'
wav_file_path = os.path.join('videos/input_audios', wav_file)

if not os.path.isfile(file_path):
    convert_video_to_wav(file_path, wav_file_path)
    convert_stereo_to_mono(wav_file_path, wav_file_path)

target_language = "de"
text = transcribe_video(wav_file_path, target_language)
print(text)
#  video_text_to_speech(file_path, text, file_name, target_language)

