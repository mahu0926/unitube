import React from 'react';

import SecondaryNavigation from '../SecondaryNavigation';

import logo from './assets/logo.png';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const navItems = {
        'Home': '/',
        'Upload': '/upload',
        'My List': '/my-list'
    };

    const handleClick = (item) => {
        console.log(`Clicked on ${item}`);
    };

    return (
        <div className={styles.navigation}>
            <div className={styles.mainNavigation}>
                <img className={styles.logo} src={logo} alt="logo" />
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
