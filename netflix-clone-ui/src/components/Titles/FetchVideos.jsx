import { useState, useEffect } from 'react';

const FetchVideos = () => {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/videos');
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return videos;
};

export default FetchVideos;
