import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">ExigentUSA</Link>
                <nav>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#usp">USP</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#pricing">Pricing</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#contact">Contact</a></li>
                    </ul>
                </nav>
                <Link to="/doctor-login" className="btn btn-primary">Doctor Signup/Login</Link>
            </div>
        </header>
    );
};

export default Header;
