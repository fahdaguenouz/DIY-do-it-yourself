import React, { useEffect } from 'react';
import Login from './../../Pages/Login/Login.jsx';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '@/Context/AuthProvider.jsx';

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
            <Login/>
        </div>
    );
}

export default LoginLayouts;
