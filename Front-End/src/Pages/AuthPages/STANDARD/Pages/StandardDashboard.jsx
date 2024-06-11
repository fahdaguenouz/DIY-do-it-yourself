import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getTutorials, getCategory, getLike, getComment } from '@/Redux/authActions';
import AnalyticEcommerce from '../../ADMIN/Pages/AnalyticEcommerce';

const StandardDashboard = () => {
    const dispatch = useDispatch();
    const { tutorials, categories, baseUrl, user, likes, comments } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getCategory());
        dispatch(getLike());
        dispatch(getComment());
    }, [dispatch]);

    // Calculate total likes and comments by the logged-in user
    const totalLikes = likes.filter(like => like.user_id === user.id).length;
    const totalComments = comments.filter(comment => comment.user_id === user.id).length;

    // Sort tutorials by creation date from newest to oldest and take the top 3
    const newestTutorials = tutorials.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);

    return (
        <div>
            <Box sx={{ padding: '20px 50px' }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 4 }}>
                    Dashboard
                </Typography>
                
                {/* User Activity Summary */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Likes"
                            count={totalLikes.toString()}
                            percentage={12.5}  // Example percentage
                            isLoss={false}
                            color="success"
                            extra={totalLikes.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Comments"
                            count={totalComments.toString()}
                            percentage={5.0}  // Example percentage
                            isLoss={false}
                            color="info"
                            extra={totalComments.toString()}
                        />
                    </Grid>
                </Grid>

                {/* Newest Tutorials */}
                <Typography variant="h4" component="h2" sx={{ marginTop: 5, marginBottom: 4 }}>
                    Newest Tutorials
                </Typography>
                <Grid container spacing={3}>
                    {newestTutorials.map((tutorial, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ textAlign: 'center', padding: 3, backgroundColor: '#fff', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } }}>
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

                 {/* Categories Section */}
                 <Typography variant="h4" component="h2" sx={{ marginTop: 5, marginBottom: 4 }}>
                    Categories
                </Typography>
                <Grid container spacing={3}>
                    {categories.slice(0, 5).map((category, index) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={category.name}>
                            <Link to={`/all/category/subcategory/${category.id}`} style={{ textDecoration: 'none' }}>
                                <Box
                                    sx={{
                                        boxShadow: '0 5px 25px -2px rgb(0 0 0 / 6%)',
                                        backgroundColor: '#fff',
                                        padding: '20px 10px',
                                        transition: '0.5s',
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: '#039ee3',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        },
                                        '&:hover .imgHover': {
                                            opacity: 1,
                                        },
                                        '&:hover h6': {
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: 80, height: 80, margin: 'auto' }}>
                                        <Box
                                            component="img"
                                            src={`${baseUrl}storage/${category.Category_picture}`}
                                            alt={category.name}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Box
                                            component="img"
                                            src={`${baseUrl}storage/${category.Category_picture}`}
                                            alt={category.name}
                                            className='imgHover'
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: 0,
                                                transition: 'opacity 0.5s',
                                            }}
                                        />
                                    </Box>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontSize: '20px', mt: 2 }}>
                                        {category.name}
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        sx={{
                                            backgroundColor: '#f8f8f8',
                                            padding: '5px 20px',
                                            fontWeight: 500,
                                            fontSize: '15px',
                                            color: '#039ee3',
                                            borderRadius: '5px',
                                            mt: 1,
                                        }}
                                    >
                                        SubCategory : {category.subcategories.length}
                                    </Typography>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default StandardDashboard;
