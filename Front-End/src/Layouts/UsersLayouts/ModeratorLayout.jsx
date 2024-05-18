import { Usercontext } from '@/Context/AuthProvider';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ModeratorLayout = () => {
    const navigate = useNavigate()

    const { logout, authenticated, loading } = Usercontext()
    useEffect(() => {
        if (!authenticated) {
            // logout()
            navigate('/login')
        }
    }, [authenticated])
    return (
        <div>
            <p>this is moderateur</p>
            <Outlet/>
        </div>
    );
}

export default ModeratorLayout;
