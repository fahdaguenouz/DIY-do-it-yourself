import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress
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
    const [statusFilter, setStatusFilter] = useState('all'); // New state for status filtering

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        applyFilters();
    }, [tutorials, titleFilter, dateFilter, selectedCategory, selectedSubCategory, selectedCreator, statusFilter]);

    const applyFilters = () => {
        let filtered = tutorials.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort tutorials by date descending

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

        if (statusFilter !== 'all') {
            filtered = filtered.filter(tutorial =>
                tutorial.status === statusFilter
            );
        }

        setFilteredTutorials(filtered);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory(''); // Reset subcategory when category changes
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };
if(loading){
    return(<Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '60vh' }}
    >
        <CircularProgress />
    </Grid>)
}
    return (
        <div>
            <Box mb={4}>
                <Grid container spacing={2}>
                    {/* Filter Fields */}
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
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                value={statusFilter}
                                label="Filter by Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="suspended">Suspended</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Subcategory</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTutorials.map((tutorial) => (
                            <TableRow key={tutorial.id}>
                                <TableCell>{tutorial.id}</TableCell>
                                <TableCell>{tutorial.titre}</TableCell>
                                <TableCell>{getCategoryName(tutorial.sub_category?.categorie_id)}</TableCell>
                                <TableCell>{tutorial.sub_category?.name}</TableCell>
                                <TableCell>{`${tutorial.user.prenom} ${tutorial.user.nom}`}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/all/category/subcategory/tutorialsdeatail/${tutorial.id}`}
                                        variant="outlined"
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TutorialsInfo;
