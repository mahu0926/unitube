import React from 'react';
import { useParams } from 'react-router-dom';

const Viewer = () => {
    let { videoPath } = useParams();
    videoPath = decodeURIComponent(videoPath);

    const handleVideoError = () => {
        console.error(`Failed to load video: ${videoPath}`);
    };

    return (
        <div style={{ marginTop: '150px', zIndex: '2000' }}>
            <video src={videoPath} controls onError={handleVideoError} />
        </div>
    );
};

export default Viewer;
