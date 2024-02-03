// LearnMorePage.js

import React from 'react';
import styles from './LearnMorePage.module.css';

const LearnMorePage = () => {
    const projectDescription = "Welcome to our Translation Project! This platform allows users to upload videos for translation into various languages. Learn more about the project and its features below.";

    const aboutProject = (
        <>
            <h2>About the Project</h2>
            <p>
                Our project aims to make videos accessible to a global audience by providing translations in multiple languages. Users can upload videos, and our platform will generate interactive transcripts and translated versions of the content.
            </p>
            <ul>
                <li><strong>Key Features:</strong></li>
                <ul>
                    <li>Upload videos for translation.</li>
                    <li>Choose from a variety of languages for translation.</li>
                    <li>View interactive transcripts for better understanding.</li>
                    <li>Watch translated versions of your videos.</li>
                    <p> 

                    </p>
                </ul>
                <li><strong>How to Use:</strong></li>
                <ol>
                    <li>Upload a video: Select a video file for translation.</li>
                    <li>Choose a language: Pick the language you want the video to be translated into.</li>
                    <li>View the transcript: An interactive transcript will be generated for better comprehension.</li>
                    <li>Watch translated video: Enjoy the video in the selected language.</li>
                    <p> 

                    </p>
                </ol>
            </ul>
            <p>
                Explore the possibilities of sharing your content with a diverse audience through our Translation Project!
            </p>
        </>
    );

    return (
        <div className={styles.LearnMorePage}>
            <div className={styles.Container}>
                <div className={styles.Header}>
                    <h1 className={styles.ProjectTitle}> ÜniTube Information</h1>
                    <p className={styles.ProjectDescription}>{projectDescription}</p>
                </div>
                <div className={styles.AboutProject}>
                    {aboutProject}
                </div>

                <div className={styles.ContactUs}>
                    <h2>Contact Us</h2>
                    <p>
                        For any inquiries or assistance, please contact us at <a href="mailto:ÜniTube@example.com">info@example.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LearnMorePage;
