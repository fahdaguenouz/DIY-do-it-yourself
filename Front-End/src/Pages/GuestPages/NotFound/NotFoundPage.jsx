// NotFoundPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    // Render the home page based on the user's role
    const getRolePath = (roleId) => {
        switch(roleId) {
            case 1: return '/admin';
            case 2: return '/moderator';
            case 3: return '/creator';
            case 4: return '/standard';
            default: return '/';
        }
    };
    // Fetch the user and authenticated state from Redux
    const { user, authenticated } = useSelector(state => state.auth);


    // Determine the home URL based on the user's role
    const homeUrl = authenticated && user ? getRolePath(user.role_id) : '/';

    
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404: Page Not Found</h1>
            <p>The page you are looking for doesn’t exist or is unavailable.</p>
            <Link to={homeUrl}>Go Home</Link>
        </div>
    );
};

export default NotFoundPage;
