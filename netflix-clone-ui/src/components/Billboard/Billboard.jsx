// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import PlayIcon from './PlayIcon';
import InfoIcon from './InfoIcon';
import deepfakeHeroImg from './assets/billboard.webp';
import deepfakeHeroTitle from './assets/billboard-title.webp';
import styles from './Billboard.module.css';

const HomePage = () => {
    return (
        <div className={styles.billboard}>
            <div className={styles.innerBillboard}>
                <img className={styles.billboardHeroImage} src={deepfakeHeroImg} alt="Deepfake Video" />
                <div className={styles.billboardHeroOverlay}></div>
                <div className={styles.info}>
                    <img className={styles.billboardHeroTitle} src={deepfakeHeroTitle} alt="Deepfake Translation" />
                    <p className={styles.description}>
                        Revolutionizing video translation through advanced deepfake technology. Translate videos into
                        different languages with seamless synchronization.
                    </p>
                    <div className={styles.links}>
                        {/* Use Link component for navigation to /upload */}
                        <Link to="/upload" className={styles.playButton}>
                            <PlayIcon />
                            <span> Upload</span>
                        </Link>
                        {/* Use Link component for navigation to /learnmore */}
                        <Link to="/learn-more" className={styles.infoButton}>
                            <InfoIcon />
                            <span> Learn More</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
