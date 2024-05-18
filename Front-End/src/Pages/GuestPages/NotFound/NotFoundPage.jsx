// NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404: Page Not Found</h1>
            <p>The page you are looking for doesn’t exist or is unavailable.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default NotFoundPage;
