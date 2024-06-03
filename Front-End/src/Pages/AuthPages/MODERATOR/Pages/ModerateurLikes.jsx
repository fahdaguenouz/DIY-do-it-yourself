import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Avatar, Button, Container, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { getLike, getTutorials, getCategory } from '@/Redux/authActions';

const ModerateurLikes = () => {
    const { tutorials, likes, user, categories } = useSelector(state => state.auth);
    const baseUrl = "http://localhost:8000/";
    const dispatch = useDispatch();

    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getLike());
        dispatch(getCategory());
    }, [dispatch]);

    const userId = user ? user.id : null;
    const userLikes = Array.isArray(likes) ? likes : [];

    // Filter tutorials initially by user likes
    let likedTutorials = tutorials.filter(tutorial =>
        userLikes.some(like => like.tutorial_id === tutorial.id && like.user_id === userId)
    );

    // Further filter by search title
    likedTutorials = likedTutorials.filter(tutorial =>
        tutorial.titre.toLowerCase().includes(searchTitle.toLowerCase())
    );

    // Filter by category and subcategory
    if (selectedSubcategory) {
        likedTutorials = likedTutorials.filter(tutorial => tutorial.Sub_Categorie_id === selectedSubcategory);
    } else if (selectedCategory) {
        const subcategories = categories.find(cat => cat.id === selectedCategory)?.subcategories || [];
        const subcategoryIds = subcategories.map(sub => sub.id);
        likedTutorials = likedTutorials.filter(tutorial => subcategoryIds.includes(tutorial.Sub_Categorie_id));
    }

    return (
        <Container>
            <TextField
                fullWidth
                label="Search by Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                select
                fullWidth
                label="Category"
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                }}
                margin="normal"
            >
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                fullWidth
                label="Subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                margin="normal"
                disabled={!selectedCategory}
            >
                {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.subcategories.map((subcat) => (
                    <MenuItem key={subcat.id} value={subcat.id}>
                        {subcat.name}
                    </MenuItem>
                ))}
            </TextField>
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
        </Container>
    );
};

export default ModerateurLikes;
