import React from 'react';

import ChevronRightIcon from './ChevronRightIcon';

import placeholderImg from './assets/thumbnail-top10-h.jpg';
import styles from './Segment.module.css';

const Segment = ({ title, videos }) => {
    console.log(videos);
    return (
        <div className={styles.segment}>
            <p className={styles.title}>
                {title}
                <span className={styles.icon}>
                    <svg width="8" height="8" viewBox="0 0 23 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.5 3L21 20.5L3.5 38"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </p>
            <div className={styles.row}>
                {videos.map((video, index) => (
                    <div key={index}>
                        <img src={video.thumbnail || placeholderImg} alt={video.name} />
                        <p className={styles.caption}>{video.name}</p>                    
                        </div>
                ))}
                <button className={styles.button}>
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

export default Segment;
