import React from 'react';

import Segment from '../Segment';

import styles from './Titles.module.css';

const Titles = () => {
    return (
        <div className={styles.titles}>
            <Segment title="Recently Translated" />
            <Segment title="French" />
            <Segment title="Spanish" />
            <Segment title="Hindi" />
        </div>
    );
};

export default Titles;
