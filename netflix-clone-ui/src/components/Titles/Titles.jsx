import React from 'react';

import Segment from '../Segment';

import styles from './Titles.module.css';

import FetchVideos from './FetchVideos';

const Titles = () => {
    const videos = FetchVideos();

    const mockVideos = [
        { id: 1, name: "Video 1", url: "https://example.com/video1" },
        { id: 2, name: "Video 2", url: "https://example.com/video2" },
        { id: 3, name: "Video 3", url: "https://example.com/video3" },
    ];

    return (
        <div className={styles.titles}>
            {videos && videos.en && <Segment title="English" videos={videos.en} />}
            {videos && videos.de && <Segment title="German" videos={videos.de} />}
            <Segment title="French" videos={mockVideos} />
            <Segment title="Spanish" videos={mockVideos} />
            <Segment title="Hindi" videos={mockVideos} />
        </div>
    );
};

export default Titles;
