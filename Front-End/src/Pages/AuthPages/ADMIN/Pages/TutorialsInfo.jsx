import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getTutorials, getUsers, getCategory } from '@/Redux/authActions';

const TutorialsInfo = () => {
    const { tutorials = [], categories = [], users = [], loading, baseUrl } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [filteredTutorials, setFilteredTutorials] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedCreator, setSelectedCreator] = useState('');

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        applyFilters();
    }, [tutorials, titleFilter, dateFilter, selectedCategory, selectedSubCategory, selectedCreator]);

    const applyFilters = () => {
        let filtered = tutorials;

        if (titleFilter) {
            filtered = filtered.filter(tutorial =>
                tutorial.titre.toLowerCase().includes(titleFilter.toLowerCase())
            );
        }

        if (dateFilter) {
            const now = new Date();
            filtered = filtered.filter(tutorial => {
                const tutorialDate = new Date(tutorial.created_at);
                switch (dateFilter) {
                    case 'today':
                        return tutorialDate.toDateString() === now.toDateString();
                    case 'yesterday':
                        const yesterday = new Date(now);
                        yesterday.setDate(yesterday.getDate() - 1);
                        return tutorialDate.toDateString() === yesterday.toDateString();
                    case 'thisWeek':
                        const thisWeekStart = new Date(now);
                        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
                        return tutorialDate >= thisWeekStart;
                    case 'lastMonth':
                        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
                        return tutorialDate >= lastMonthStart && tutorialDate <= lastMonthEnd;
                    case 'thisYear':
                        return tutorialDate.getFullYear() === now.getFullYear();
                    case 'lastYear':
                        return tutorialDate.getFullYear() === now.getFullYear() - 1;
                    default:
                        return true;
                }
            });
        }

        if (selectedCategory) {
            filtered = filtered.filter(tutorial =>
                tutorial.sub_category?.categorie_id === parseInt(selectedCategory)
            );
        }

        if (selectedSubCategory) {
            filtered = filtered.filter(tutorial =>
                tutorial.sub_category?.id === parseInt(selectedSubCategory)
            );
        }

        if (selectedCreator) {
            filtered = filtered.filter(tutorial =>
                tutorial.user_id === parseInt(selectedCreator)
            );
        }

        setFilteredTutorials(filtered);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory(''); // Reset subcategory when category changes
    };

    return (
        <div>
            <Box mb={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Search by Title"
                            variant="outlined"
                            fullWidth
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="date-filter-label">Filter by Date</InputLabel>
                            <Select
                                labelId="date-filter-label"
                                value={dateFilter}
                                label="Filter by Date"
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="yesterday">Yesterday</MenuItem>
                                <MenuItem value="thisWeek">This Week</MenuItem>
                                <MenuItem value="lastMonth">Last Month</MenuItem>
                                <MenuItem value="thisYear">This Year</MenuItem>
                                <MenuItem value="lastYear">Last Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                            <Select
                                labelId="category-filter-label"
                                value={selectedCategory}
                                label="Filter by Category"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="subcategory-filter-label">Filter by Subcategory</InputLabel>
                            <Select
                                labelId="subcategory-filter-label"
                                value={selectedSubCategory}
                                label="Filter by Subcategory"
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                disabled={!selectedCategory}
                            >
                                <MenuItem value="">All</MenuItem>
                                {selectedCategory && categories.find(category => category.id === parseInt(selectedCategory))?.subcategories.map(subcategory => (
                                    <MenuItem key={subcategory.id} value={subcategory.id}>{subcategory.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="creator-filter-label">Filter by Creator</InputLabel>
                            <Select
                                labelId="creator-filter-label"
                                value={selectedCreator}
                                label="Filter by Creator"
                                onChange={(e) => setSelectedCreator(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {users.filter(user => user.role_id === 3).map(user => (
                                    <MenuItem key={user.id} value={user.id}>{`${user.prenom} ${user.nom}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2}>
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
        </div>
    );
}

export default TutorialsInfo;
