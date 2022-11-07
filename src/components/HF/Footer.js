import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <div className="container mt-3 mb-3">
            <p >Copyright &copy; {year}</p>
        </div>
    );
};

export default Footer;