import { useState } from 'react';
import axios from 'axios';

const useUpload = () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file) => {
        setIsUploading(true);
        setError(null);
    
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await axios.post('/api/upload', formData, {    // TODO: Replace with the actual API endpoint
                onUploadProgress: (progressEvent) => {
                    const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(progressPercentage);
                }
            });
    
            setIsUploading(false);
    
            if (!response.ok) {
                throw new Error('Error uploading file');
            }
    
            // Handle the response here
        } catch (error) {
            setError(error.message);
            setIsUploading(false);
        }
    };

    return { progress, isUploading, error, uploadFile };
};

export default useUpload;
