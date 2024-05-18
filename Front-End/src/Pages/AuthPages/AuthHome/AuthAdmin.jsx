import { Usercontext } from '@/Context/AuthProvider';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthAdmin = () => {
    const { user, authenticated, loading } = useSelector(state => state.auth);
    
    



    console.log('the loged in user is '+ user);
   
    return (
        <div>
             

             {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.nom} {user.prenom}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.adresse}</p>
                    <p>role: {user.role_id}</p>
                    <p>level: {user.level_id}</p>

                    
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}

export default AuthAdmin;
