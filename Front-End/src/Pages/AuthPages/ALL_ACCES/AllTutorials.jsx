import React, { useEffect } from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getTutorials } from '@/Redux/authActions';
import { Link, useParams } from 'react-router-dom';

const AllTutorials = () => {
    const { baseUrl, tutorials, user, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTutorials());
    }, [dispatch]);

    const filteredTutorials = tutorials.filter(tutorial => tutorial.sub_category.id === parseInt(id));

    return (
        <Box sx={{ width: '100%' }}>
            {filteredTutorials.length === 0 ? (
                <Typography variant="h5" component="h2" sx={{ mt: 4, mx: 'auto' }}>
                    No tutorials yet in this subcategory
                </Typography>
            ) : (
                <Grid container spacing={3} sx={{ padding: '0 50px' }}>
                    {filteredTutorials.map((tutorial, index) => (
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
                                        <Avatar
                                            src={`${baseUrl}${tutorial.user.profile_picture}`}
                                            alt={tutorial.user.nom}
                                            sx={{ width: 50, height: 50, mr: 2 }}
                                        />
                                        <Typography variant="body1">{`${tutorial.user.prenom} ${tutorial.user.nom}`}</Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#f8f8f8', padding: 1, margin: '30px 0' }}>
                                        <Typography variant="h6" color="primary">{tutorial.priceAll}</Typography>
                                    </Box>
                                    <Button
                                        component={Link}
                                        to={`/all/category/subcategory/tutorialsdeatail/${tutorial.id}`}
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
            )}
        </Box>
    );
};

export default AllTutorials;
