import { Usercontext } from '@/Context/AuthProvider';
import MainDrawer from '@/Pages/AuthPages/STANDARD/Drawer';
import Header from '@/Pages/AuthPages/STANDARD/Header';
import { Box, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const StandarLayout = () => {
    const navigate = useNavigate()

    const { user, authenticated, loading } = useSelector(state => state.auth);
    useEffect(() => {
        if (!authenticated) {
            // logout()
            navigate('/login')
        }
    }, [authenticated])
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>



            <Header />
            <MainDrawer />
            <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default StandarLayout;
