import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticEcommerce from './AnalyticEcommerce';
import { getTutorials } from '@/Redux/authActions';

const AdminDashboard = () => {
    const { baseUrl,users,tutorials, user, authenticated, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getTutorials())
    },[dispatch])
    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
    </Box>;
    }

    console.log(user);


    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Tutorials" count={tutorials.length.toString()} percentage={59.3} extra={tutorials.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={users.length.toString()} percentage={70.5} extra={users.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Signals" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Blogs" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>




            {user ? (
                <Grid item xs={12} style={{ marginTop: '20px' }}>
                    <Typography variant="h6">User Details:</Typography>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.nom} {user.prenom}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.adresse}</p>
                    <p>Role: {user.role_id}</p>
                    <p>Level: {user.level_id}</p>
                    {user.profile_picture && (
                        <img src={`${baseUrl}${user.profile_picture}`} alt={`${user.nom}'s Profile`} style={{ maxWidth: '100px' }} />
                    )}
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Typography>No user data available</Typography>
                </Grid>
            )}
        </Grid>
    );
}

export default AdminDashboard;
