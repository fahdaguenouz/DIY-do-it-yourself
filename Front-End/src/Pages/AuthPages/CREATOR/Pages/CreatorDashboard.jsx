import { Usercontext } from '@/Context/AuthProvider';
import { getTutorials } from '@/Redux/authActions';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const CreatorDashboard = () => {
    const { baseUrl,user, authenticated, loading } = useSelector(state => state.auth);
    const dispatch=useDispatch()
    
        useEffect(()=>{
            dispatch(getTutorials())

        },[dispatch])


    console.log('the loged in user is '+ user);
   
    return (
        <div>
             
             <Toaster position="top-center" reverseOrder={false} />

             {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.nom} {user.prenom}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.adresse}</p>
                    <p>role: {user.role_id}</p>
                    <p>level: {user.level_id}</p>
                        {user.profile_picture}
                    <img src={`${baseUrl}${user.profile_picture}`} alt={`${user.nom}'s Profile`} />

                    
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}

export default CreatorDashboard;
