import React from 'react';
import classNames from 'class-names';
import Logo from '../logo/logo.jsx';
import styles from './header.module.css';

const Header = ({heroImage = "", heroAlt = "", heroCredit = ""}) => {
    const hasHero = heroImage !== "";
    return (
        <header className={classNames(styles.header, { [styles.hasHero]: hasHero })}>
            <Logo className={styles.logo} />
            {hasHero && <>
                <img className={styles.hero} src={heroImage} alt={heroAlt}/>
                {heroCredit !== "" && <span className={styles.credit}>{heroCredit}</span>}
            </>}
        </header>
    )
};

export default Header;