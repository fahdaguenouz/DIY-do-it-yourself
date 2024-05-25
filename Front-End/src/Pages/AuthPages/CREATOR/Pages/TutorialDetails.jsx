import React, { useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Grid, Rating, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorials } from '@/Redux/authActions';

const TutorialDetails = () => {
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(getTutorials())

    },[dispatch])
    const { tutorials,baseUrl } = useSelector(state => state.auth);
    console.log(tutorials);
    const { id } = useParams();

    const tutorial = tutorials.find(t => t.id === parseInt(id));

    if (!tutorial) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
    </Box>;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">{tutorial.titre}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box display="flex" justifyContent="flex-start">
                        <CardMedia
                            component="img"
                            height="200"
                            image={`${baseUrl}storage/${tutorial.cover}`}
                            alt="Tutorial Cover"
                        />
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Creator: {tutorial.user.nom}</Typography>
                            <Typography variant="body1">{tutorial.user.adresse}</Typography>
                            <img src={`${baseUrl}${tutorial.user.profile_picture}`} alt="User Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Category: {tutorial.sub_category.name}</Typography>
                        <Typography variant="body1">Subcategory: {tutorial.sub_category.name}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">Description: {tutorial.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        {tutorial.media.map((media, index) => (
                            <Grid item xs={6} key={index}>
                                {media.media_type === 'photo' ? (
                                    <img src={`${baseUrl}storage/${media.media_url}`} alt={`Media ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                ) : (
                                    <video src={`${baseUrl}storage/${media.media_url}`} controls style={{ width: '100%', height: 'auto' }} />
                                )}
                                <CardContent>
                                    <Typography variant="body1">{media.description}</Typography>
                                </CardContent>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1">Rate this tutorial:</Typography>
                        <Rating name="rating" defaultValue={0} max={5} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Leave a comment" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TutorialDetails;
