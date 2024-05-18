import { Usercontext } from '@/Context/AuthProvider';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const CreatorLayout = () => {
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
            <p>this is creator</p>
            <Outlet/>
        </div>
    );
}

export default CreatorLayout;
