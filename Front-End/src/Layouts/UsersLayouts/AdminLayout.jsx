import { Usercontext } from '@/Context/AuthProvider';
import MainDrawer from '@/Pages/AuthPages/ADMIN/Drawer';
import Header from '@/Pages/AuthPages/ADMIN/Header';
import { handlerDrawerOpen } from '@/Pages/AuthPages/ADMIN/menu';
import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import  Box  from '@mui/material/Box';
import  Toolbar  from '@mui/material/Toolbar';

const AdminLayout = () => {
    const navigate = useNavigate()
    const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    const { user, authenticated, loading } = useSelector(state => state.auth);
    useEffect(() => {
        handlerDrawerOpen(!downXL);
        if (!authenticated) {
            // logout()
            navigate('/login')
        }
    }, [authenticated,downXL])

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>


            
                <Header />
                <MainDrawer />
                <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                    <p>this is a admin</p>
                    <Outlet />
                </Box>


            

        </Box>
    );
}

export default AdminLayout;
