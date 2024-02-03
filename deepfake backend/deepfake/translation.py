import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "refined-network-320317-cdee89864c6c.json"

from google.cloud import translate_v2 as translate

def translate_text(text, target_language='en'):
    # Create a Translate client
    translate_client = translate.Client()

    # Use the translate method to perform text translation
    result = translate_client.translate(text, target_language=target_language)

    # Print the translation
    print(f'Text: {text}')
    print(f'Translation in {target_language}: {result["translatedText"]}')

translate_text("hello my name is john", target_language='es')

