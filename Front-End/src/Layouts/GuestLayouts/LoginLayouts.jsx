import React, { useEffect } from 'react';
// import Login from './../../Pages/Login/Login.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { Usercontext } from '@/Context/AuthProvider.jsx';
import Login from '@/Pages/authentication/login';
// import AuthLogin from '@/Pages/authentication/login';

const LoginLayouts = () => {
    const navigate=useNavigate()
    const {authenticated} =Usercontext()
    useEffect(()=>{
        if(authenticated){
            navigate('/')
        }
    },[authenticated, navigate])
    return (
        <div>
          
            <Outlet/>
        </div>
    );
}

export default LoginLayouts;
