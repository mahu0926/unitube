import { useState } from 'react';
import axios from 'axios';

const useUpload = () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const uploadFile = async (file) => {
        setIsUploading(true);
        setError(null);
    
        try {
            const formData = new FormData();
            formData.append('video', file);  // Make sure the 'name' is the same as what the server expects
    
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(progressPercentage);
                },
            });
    
            setIsUploading(false);
            if (response.status !== 200) {
                throw new Error(`Error status code: ${response.status}`);
            }
            setUploadSuccess(true);
        } catch (err) {
            setError(err.message);
            setIsUploading(false);
        }
    };

    return { uploadFile, progress, isUploading, error, uploadSuccess };
};

export default useUpload;