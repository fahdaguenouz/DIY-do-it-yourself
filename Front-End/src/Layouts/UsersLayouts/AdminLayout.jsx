import { Usercontext } from '@/Context/AuthProvider';
import MainDrawer from '@/Pages/AuthPages/ADMIN/Drawer';
import Header from '@/Pages/AuthPages/ADMIN/Header';
import { handlerDrawerOpen } from '@/Pages/AuthPages/ADMIN/menu';
import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import  Box  from '@mui/material/Box';
import  Toolbar  from '@mui/material/Toolbar';
import 'ldrs/quantum'
import { getLevels, getRoles, getUsers } from '@/Redux/authActions';
const AdminLayout = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const { user, authenticated, loading } = useSelector(state => state.auth);
   

    useEffect(() => {
        dispatch(getLevels());
        dispatch(getUsers());
        dispatch(getRoles());
      }, [dispatch]);

// if (!loading) {
//         return <div className="text-center text-primary" >


//             <l-quantum
//                 size="45"
//                 speed="1.75"
//                 color="#039ee3"
//             ></l-quantum>
//         </div>;
//     }
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

export default AdminLayout;
