import { Usercontext } from '@/Context/AuthProvider';
import MainDrawer from '@/Pages/AuthPages/CREATOR/Drawer';
import Header from '@/Pages/AuthPages/CREATOR/Header';
import { getCategory } from '@/Redux/authActions';
import { Box, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const CreatorLayout = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const { user, authenticated, loading } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(getCategory());
        
      }, [dispatch]);
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

export default CreatorLayout;
