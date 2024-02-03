// UploadPage.js

import React, { useState } from 'react';
import styles from './UploadPage.module.css';

import UploadProgressBar from './UploadProgressBar';
import useUpload from './UploadHook';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showTranslatedVideo, setShowTranslatedVideo] = useState(false);
    const [transcript, setTranscript] = useState('');

    const { progress, isUploading, error, uploadFile, uploadSuccess } = useUpload(); // Call the hook

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

    const handleUpload = async () => {
        console.log('Uploading file...');
        if (!selectedFile) {
            return;
        }

        await uploadFile(selectedFile);
        if (error) {
            console.error(`Upload failed: ${error}`);
        } else {
            console.log('Upload successful');
        }
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
                                        {progress > 0 && <UploadProgressBar uploadProgress={progress} />}
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
