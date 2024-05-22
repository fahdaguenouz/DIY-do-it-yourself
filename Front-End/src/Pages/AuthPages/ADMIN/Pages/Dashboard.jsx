import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { user, authenticated, loading } = useSelector(state => state.auth);
    const baseUrl = "http://localhost:8000/";
    

console.log(user);

   
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
                    <p>image: {user.profile_picture}</p>

                    <img src={`${baseUrl}${user.profile_picture}`} alt={`${user.nom}'s Profile`} />

                    
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}

export default Dashboard;
