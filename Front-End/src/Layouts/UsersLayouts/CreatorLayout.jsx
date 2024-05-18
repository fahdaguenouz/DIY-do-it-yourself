import { Usercontext } from '@/Context/AuthProvider';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const CreatorLayout = () => {
    const navigate = useNavigate()
    const { user, authenticated, loading } = useSelector(state => state.auth);
    useEffect(() => {
        if (!authenticated) {
            // logout()
            navigate('/login')
        }
    }, [authenticated])
    return (
        <div>
            <p>this is creator</p>
            <Outlet/>
        </div>
    );
}

export default CreatorLayout;
