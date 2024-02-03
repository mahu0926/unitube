// Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

import SecondaryNavigation from '../SecondaryNavigation';
import logo from './assets/logo.png';
import styles from './Navigation.module.css';

const Navigation = () => {
    const navItems = {
        'Home': '/',
        'Upload': '/upload',
        'Learn More': '/learn-more'
    };

    const handleClick = (item) => {
        console.log(`Clicked on ${item}`);
    };

    return (
        <div className={styles.navigation}>
            <div className={styles.mainNavigation}>
                <Link to="/" className={styles.logoButton}>
                    <img className={styles.logo} src={logo} alt="Logo" />
                </Link>
                <ul className={styles.navigationList}>
                    {Object.entries(navItems).map(([item, link]) => (
                        <li className={styles.navigationItem} key={item}>
                            <Link to={link} onClick={() => handleClick(item)}>{item}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <SecondaryNavigation /> */}
        </div>
    );
};

export default Navigation;
