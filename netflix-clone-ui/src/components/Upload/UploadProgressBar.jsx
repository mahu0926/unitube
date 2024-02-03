// UploadProgressBar.jsx
import React from 'react';
import styles from './UploadPage.module.css';

const UploadProgressBar = ({ uploadProgress }) => (
    <div className={styles.ProgressBarSection}>
        <div className={styles.Line}></div>
        <div className={styles.ProgressBar}>
            <div
                className={styles.ProgressBarFill}
                style={{ width: `${uploadProgress}%` }}
            />
        </div>
        <div className={styles.ProgressBarPercentage}>
            {uploadProgress <= 100 ? uploadProgress : 100}%
        </div>
    </div>
);

export default UploadProgressBar;