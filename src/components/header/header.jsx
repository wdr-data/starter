import React from 'react';
import Logo from '../logo/logo.jsx';

const Header = ({heroImage, heroAlt, heroCredit}) => {
    return (
        <header>
            <Logo/>
            <img src={heroImage} alt={heroAlt}/>
            <span>{heroCredit}</span>
        </header>
    )
};

export default Header;