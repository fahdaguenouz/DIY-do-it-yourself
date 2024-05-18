import { Usercontext } from '@/Context/AuthProvider';
import React, { useEffect, useState } from 'react';

const AuthAdmin = () => {
     const {user}=Usercontext()
    
    



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
