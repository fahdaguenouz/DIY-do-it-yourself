import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { user, authenticated, loading } = useSelector(state => state.auth);
    
    



   
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

export default Dashboard;
