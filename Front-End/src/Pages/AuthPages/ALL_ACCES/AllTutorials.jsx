import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getTutorials } from '@/Redux/authActions';
import { Link, useParams } from 'react-router-dom';

const AllTutorials = () => {
    const dispatch = useDispatch();
    const { baseUrl, tutorials } = useSelector(state => state.auth);
    const { id } = useParams();
    const [titleFilter, setTitleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        dispatch(getTutorials());
    }, [dispatch]);

    const handleDateFilter = (tutorial, filter) => {
        const tutorialDate = new Date(tutorial.created_at);
        const now = new Date();
        switch (filter) {
            case 'today':
                return tutorialDate.toDateString() === now.toDateString();
            case 'yesterday':
                let yesterday = new Date();
                yesterday.setDate(now.getDate() - 1);
                return tutorialDate.toDateString() === yesterday.toDateString();
            case 'thisMonth':
                return tutorialDate.getMonth() === now.getMonth() && tutorialDate.getFullYear() === now.getFullYear();
            case 'lastMonth':
                let lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);
                return tutorialDate.getMonth() === lastMonth.getMonth() && tutorialDate.getFullYear() === lastMonth.getFullYear();
            default:
                return true;
        }
    };

    const filteredTutorials = tutorials.filter(tutorial => 
        tutorial.sub_category.id === parseInt(id) &&
        tutorial.titre.toLowerCase().includes(titleFilter.toLowerCase()) &&
        handleDateFilter(tutorial, dateFilter)
    );

    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Search by Title"
                        value={titleFilter}
                        onChange={e => setTitleFilter(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="date-filter-label">Filter by Date</InputLabel>
                        <Select
                            labelId="date-filter-label"
                            value={dateFilter}
                            label="Filter by Date"
                            onChange={e => setDateFilter(e.target.value)}
                        >
                            <MenuItem value="">All Dates</MenuItem>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="yesterday">Yesterday</MenuItem>
                            <MenuItem value="thisMonth">This Month</MenuItem>
                            <MenuItem value="lastMonth">Last Month</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {filteredTutorials.length === 0 ? (
                <Typography variant="h5" component="h2" sx={{ mt: 4, mx: 'auto' }}>
                    No tutorials found for the selected filters.
                </Typography>
            ) : (
                <Grid container spacing={3} sx={{ mt: 3 }}>
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
