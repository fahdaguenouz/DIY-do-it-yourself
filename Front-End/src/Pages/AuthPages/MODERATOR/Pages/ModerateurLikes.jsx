import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Avatar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { getLike, getTutorials } from '@/Redux/authActions';

const ModerateurLikes = () => {
    const { tutorials, likes, user } = useSelector(state => state.auth);
    const baseUrl = "http://localhost:8000/"; // Replace with your actual base URL
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getLike()); // Fetch all likes
    }, [dispatch]);

    // Ensure likes is an array before attempting to use it
    const userId = user ? user.id : null;
    const userLikes = likes.likes ? likes.likes : []; // Extract the array from the likes object
    const likedTutorials = Array.isArray(userLikes) ? tutorials.filter(tutorial => 
        userLikes.find(like => like.tutorial_id === tutorial.id && like.user_id === userId)
    ) : [];

    console.log('Liked Tutorials:', likedTutorials);
    console.log('Tutorials:', tutorials);
    console.log('Likes:', likes);

    return (
        <Container>
            <Grid container spacing={2}>
                {likedTutorials.map((tutorial, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ textAlign: 'center', padding: 3, backgroundColor: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${baseUrl}storage/${tutorial.cover}`}
                                alt={tutorial.titre}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">{tutorial.titre}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, color: '#039ee3' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fa fa-star" />
                                    ))}
                                    <Typography component="label" sx={{ ml: 0.5 }}>(5.0)</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey', margin: '20px 0' }}>
                                    <Avatar src={`${baseUrl}${tutorial.user.profile_picture}`} alt={tutorial.user.nom} sx={{ width: 50, height: 50, mr: 2 }} />
                                    <Typography variant="body1">{`${tutorial.user.prenom} ${tutorial.user.nom}`}</Typography>
                                </Box>
                                <Box sx={{ backgroundColor: '#f8f8f8', padding: 1, margin: '30px 0' }}>
                                    <Typography variant="h6" color="primary">{tutorial.priceAll}</Typography>
                                </Box>
                                <Button
                                    component={Link}
                                    to={`/all/category/subcategory/tutorialsdeatail/${tutorial.id}`} // encode the titre to include special characters
                                    variant="outlined"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#039ee3',
                                            color: '#fff',
                                            borderColor: '#039ee3',
                                        }
                                    }}
                                >
                                    Visit Now!
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ModerateurLikes;
