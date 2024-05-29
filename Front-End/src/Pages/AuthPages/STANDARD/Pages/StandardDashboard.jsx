import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getTutorials, getCategory } from '@/Redux/authActions';

const StandardDashboard = () => {
    const dispatch = useDispatch();
    const { tutorials, categories, baseUrl, loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getCategory());
    }, [dispatch]);

    const latestTutorials = tutorials.slice(0, 3);

    return (
        <div>
            <Box sx={{ padding: '20px 50px' }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 4 }}>
                    New Tutorials
                </Typography>
                <Grid container spacing={3}>
                    {latestTutorials.map((tutorial, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${baseUrl}storage/${tutorial.cover}`}
                                    alt={tutorial.titre}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">{tutorial.titre}</Typography>
                                    <Typography variant="body2" color="textSecondary">{tutorial.description}</Typography>
                                    <Button 
                                        component={Link}
                                        to={`/tutorial/${tutorial.id}`}
                                        variant="outlined"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#039ee3',
                                                color: '#fff',
                                                borderColor: '#039ee3',
                                            },
                                            marginTop: 2
                                        }}
                                    >
                                        View Tutorial
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ padding: '20px 50px', marginTop: 4 }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 4 }}>
                    Categories
                </Typography>
                <Grid container spacing={3}>
                    {categories.slice(0, 5).map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${baseUrl}storage/${category.Category_picture}`}
                                    alt={category.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">{category.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{category.description}</Typography>
                                    <Button 
                                        component={Link}
                                        to={`/category/${category.id}`}
                                        variant="outlined"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#039ee3',
                                                color: '#fff',
                                                borderColor: '#039ee3',
                                            },
                                            marginTop: 2
                                        }}
                                    >
                                        Explore
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default StandardDashboard;
