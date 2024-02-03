import React, { useState } from 'react';
import styles from './UploadPage.module.css';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Logic to upload the selected file
        if (selectedFile) {
            // Perform the upload operation here
            console.log('Uploading file:', selectedFile);
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div className={styles.UploadPage}>
            <h1>Video Upload Page</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadPage;
