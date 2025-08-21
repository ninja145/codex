import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="container py-3">
            <Link to="/ba-login">BA Login</Link>
            <p className="mt-2">&copy; 2024 ExigentUSA. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
