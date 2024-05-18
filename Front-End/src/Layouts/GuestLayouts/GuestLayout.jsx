import Footer from '@/Pages/GuestPages/common/footer/Footer';
import Header from '@/Pages/GuestPages/common/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from '../../Pages/Header';
// import Footer from '../../Pages/Footer';

const GuestLayout = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>
        <div>
            <Outlet/>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    );
}

export default GuestLayout;
