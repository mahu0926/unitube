// UploadPage.js

import React, { useState } from 'react';
import styles from './UploadPage.module.css';

import UploadProgressBar from './UploadProgressBar';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showTranslatedVideo, setShowTranslatedVideo] = useState(false);
    const [transcript, setTranscript] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Clear selected file and preview if not a video
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            return;
        }

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setUploadSuccess(true);
                    setTranscript('This is the transcript text.'); // Replace with the actual transcript
                }
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 500);
    };

    const handleWatchTranslatedVideo = () => {
        setShowTranslatedVideo(true);
    };

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setSelectedLanguage(selectedLang);
    };

    const languageOptions = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'zh', name: 'Chinese' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ar', name: 'Arabic' },
        { code: 'fr', name: 'French' },
        { code: 'ru', name: 'Russian' },
    ];

    return (
        <div className={styles.UploadPage}>
            <h1 className={styles.UploadTitle}>Upload Video to be Translated</h1>
            <div className={styles.SplitLayout}>
                <div className={styles.Preview}>
                    {showTranslatedVideo ? (
                        <video width="100%" height="100%" controls>
                            <source src={previewUrl} type={selectedFile?.type} />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        previewUrl && (
                            <>
                                <video width="100%" height="100%" controls>
                                    <source src={previewUrl} type={selectedFile?.type} />
                                    Your browser does not support the video tag.
                                </video>
                            </>
                        )
                    )}
                </div>
                <div className={styles.RightSection}>
                    {showTranslatedVideo && (
                        <div className={styles.TranscriptBox}>
                            <h2>Interactive Transcript</h2>
                            <div className={styles.TranscriptContent}>
                                <p>{transcript}</p>
                            </div>
                        </div>
                    )}
                    {!showTranslatedVideo && (
                        <>
                            <div className={styles.TranslateDropdown}>
                                <label htmlFor="language">Translate to: </label>
                                <select
                                    id="language"
                                    name="language"
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                >
                                    {languageOptions.map((option) => (
                                        <option key={option.code} value={option.code}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.FileUploadSection}>
                                {uploadSuccess ? (
                                    <div className={styles.UploadComplete}>
                                        <button onClick={handleWatchTranslatedVideo}>
                                            Watch Translated Video
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.FileInput}>
                                            <input type="file" accept="video/*" onChange={handleFileChange} />
                                        </div>
                                        <div className={styles.UploadButton}>
                                            <button onClick={handleUpload} disabled={!selectedFile}>
                                                Upload
                                            </button>
                                        </div>
                                        {uploadProgress > 0 && <UploadProgressBar uploadProgress={uploadProgress} />}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
