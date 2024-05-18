import { Usercontext } from '@/Context/AuthProvider';
import { CSpinner } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'ldrs/quantum'
import Sidebar from '@/Pages/GuestPages/common/Sidebar/Sidebar';
const UserLayout = () => {
    const navigate = useNavigate()

    const { logout, authenticated, loading } = Usercontext()
    useEffect(() => {
        if (!authenticated) {
            // logout()
            navigate('/login')
        }
    }, [authenticated])

    // if (loading || !authenticated) {
    //     return <div className="text-center text-primary" >


    //         <l-quantum
    //             size="45"
    //             speed="1.75"
    //             color="#039ee3"
    //         ></l-quantum>
    //     </div>;
    // }

    return (
        <div>
            {/* <Sidebar/> */}
            this is userLAyouts 
            <Outlet />
        </div>
    );
}

export default UserLayout;
