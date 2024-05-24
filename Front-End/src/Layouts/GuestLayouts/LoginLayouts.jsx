import React, { useEffect } from 'react';
// import Login from './../../Pages/Login/Login.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { Usercontext } from '@/Context/AuthProvider.jsx';
import Login from '@/Pages/authentication/login';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
// import AuthLogin from '@/Pages/authentication/login';

const LoginLayouts = () => {
    const getRolePath = (roleId) => {
        switch(roleId) {
            case 1: return '/admin';
            case 2: return '/moderator';
            case 3: return '/creator';
            case 4: return '/standard';
            default: return '/';
        }
    };
    const navigate=useNavigate()
    const { baseUrl,users, user, authenticated, loading } = useSelector(state => state.auth);
    const homeUrl = authenticated && user ? getRolePath(user.role_id) : '/';
    useEffect(()=>{
        if(authenticated){
            navigate(homeUrl)
        }
    },[authenticated, navigate])

    if (authenticated) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
    </Box>;
    }
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default LoginLayouts;
