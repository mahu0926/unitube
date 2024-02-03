import os
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

def transcribe_video(audio_file_path):
    client = speech.SpeechClient()
    audio_frame_rate =  AudioSegment.from_wav("videos/output_audio.wav").frame_rate
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
        translation = translate_text(result.alternatives[0].transcript)
        # print("Transcript: {}".format(translation))
        result_transcript += str(translation)
    return result_transcript

input_file = 'videos/video1594907834.mp4'
output_file = 'videos/output_audio.wav'

convert_video_to_wav(input_file, output_file)
convert_stereo_to_mono(output_file, output_file)
print(transcribe_video(output_file))

