import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    CircularProgress,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { getTutorials, getUsers, getComment, getLike, getSignal, getCategory } from '@/Redux/authActions';
import AnalyticEcommerce from './AnalyticEcommerce';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CreatorDashboard = () => {
    const { signals = [], categories = [], users = [], tutorials = [], comments = [], likes = [], user, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [tutorialsPage, setTutorialsPage] = useState(0);
    const [tutorialsRowsPerPage, setTutorialsRowsPerPage] = useState(5);
    const [commentsPage, setCommentsPage] = useState(0);
    const [commentsRowsPerPage, setCommentsRowsPerPage] = useState(5);
    const [filteredTutorials, setFilteredTutorials] = useState([]);

    // New states for chart-related data
    const [chartTutorials, setChartTutorials] = useState([]);
    const [chartCategory, setChartCategory] = useState('');
    const [chartSubCategory, setChartSubCategory] = useState('');
    const [chartSubCategories, setChartSubCategories] = useState([]);

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
        dispatch(getCategory());
        dispatch(getComment());
        dispatch(getLike());
        dispatch(getSignal());
    }, [dispatch]);

    useEffect(() => {
        setFilteredTutorials(
            tutorials.filter(tutorial => tutorial.user_id === user.id)
        );
    }, [tutorials, user.id]);

    useEffect(() => {
        setChartTutorials(
            tutorials.filter(tutorial => tutorial.user_id === user.id && (!chartSubCategory || tutorial.Sub_Categorie_id === chartSubCategory))
        );
    }, [tutorials, chartSubCategory, user.id]);

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setChartCategory(selectedCategoryId);
        setChartSubCategory('');
        const selectedCategoryData = categories.find(category => category.id === selectedCategoryId);
        setChartSubCategories(selectedCategoryData ? selectedCategoryData.subcategories : []);
        setChartTutorials(tutorials.filter(tutorial => tutorial.user_id === user.id && tutorial.Categorie_id === selectedCategoryId));
    };

    const handleSubCategoryChange = (event) => {
        const selectedSubCategoryId = event.target.value;
        setChartSubCategory(selectedSubCategoryId);
        setChartTutorials(tutorials.filter(tutorial => tutorial.user_id === user.id && tutorial.Sub_Categorie_id === selectedSubCategoryId));
    };

    const handleTutorialsPageChange = (event, newPage) => {
        setTutorialsPage(newPage);
    };

    const handleTutorialsRowsPerPageChange = (event) => {
        setTutorialsRowsPerPage(parseInt(event.target.value, 10));
        setTutorialsPage(0);
    };

    const handleCommentsPageChange = (event, newPage) => {
        setCommentsPage(newPage);
    };

    const handleCommentsRowsPerPageChange = (event) => {
        setCommentsRowsPerPage(parseInt(event.target.value, 10));
        setCommentsPage(0);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Calculate counts for filtered chart tutorials
    const chartTutorialCount = chartTutorials.length;
    const chartCommentCount = comments.filter(comment => chartTutorials.some(tutorial => tutorial.id === comment.tutorial_id)).length;
    const chartLikeCount = likes.filter(like => chartTutorials.some(tutorial => tutorial.id === like.tutorial_id)).length;
    const chartSignalCount = signals.filter(signal => chartTutorials.some(tutorial => tutorial.id === signal.tutorial_id)).length;

    // Sort filtered chart tutorials by likes and comments
    const mostLikedChartTutorials = [...chartTutorials].sort((a, b) => {
        const aLikes = likes.filter(like => like.tutorial_id === a.id).length;
        const bLikes = likes.filter(like => like.tutorial_id === b.id).length;
        return bLikes - aLikes;
    });

    const mostCommentedChartTutorials = [...chartTutorials].sort((a, b) => {
        const aComments = comments.filter(comment => comment.tutorial_id === a.id).length;
        const bComments = comments.filter(comment => comment.tutorial_id === b.id).length;
        return bComments - aComments;
    });

    // Sort filtered tutorials for tables by likes and comments
    const sortedByLikes = [...filteredTutorials].sort((a, b) => {
        const aLikes = likes.filter(like => like.tutorial_id === a.id).length;
        const bLikes = likes.filter(like => like.tutorial_id === b.id).length;
        return bLikes - aLikes;
    });

    const sortedByComments = [...filteredTutorials].sort((a, b) => {
        const aComments = comments.filter(comment => comment.tutorial_id === a.id).length;
        const bComments = comments.filter(comment => comment.tutorial_id === b.id).length;
        return bComments - aComments;
    });

    // Chart data for filtered chart tutorials
    const chartData = {
        labels: chartTutorials.map(tutorial => tutorial.titre),
        datasets: [
            {
                label: 'Likes',
                data: chartTutorials.map(tutorial => likes.filter(like => like.tutorial_id === tutorial.id).length),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Comments',
                data: chartTutorials.map(tutorial => comments.filter(comment => comment.tutorial_id === tutorial.id).length),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75} justifyContent="center">
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" align="center">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Tutorials" count={filteredTutorials.length.toString()} percentage={59.3} extra={filteredTutorials.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Comments" count={comments.filter(comment => filteredTutorials.some(tutorial => tutorial.id === comment.tutorial_id)).length.toString()} percentage={70.5} extra={comments.filter(comment => filteredTutorials.some(tutorial => tutorial.id === comment.tutorial_id)).length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Likes" count={likes.filter(like => filteredTutorials.some(tutorial => tutorial.id === like.tutorial_id)).length.toString()} percentage={27.4} extra={likes.filter(like => filteredTutorials.some(tutorial => tutorial.id === like.tutorial_id)).length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Signals" count={signals.filter(signal => filteredTutorials.some(tutorial => tutorial.id === signal.tutorial_id)).length.toString()} percentage={27.4} isLoss color="warning" extra={signals.filter(signal => filteredTutorials.some(tutorial => tutorial.id === signal.tutorial_id)).length.toString()} />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={chartCategory} onChange={handleCategoryChange}>
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Subcategory</InputLabel>
                    <Select value={chartSubCategory} onChange={handleSubCategoryChange} disabled={!chartCategory}>
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {chartSubCategories.map(subcategory => (
                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                    <Box width="75%">
                        <Bar data={chartData} />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Most Liked Tutorials</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Likes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedByLikes.slice(tutorialsPage * tutorialsRowsPerPage, tutorialsPage * tutorialsRowsPerPage + tutorialsRowsPerPage).map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell>{tutorial.id}</TableCell>
                                            <TableCell>{tutorial.titre}</TableCell>
                                            <TableCell>{likes.filter(like => like.tutorial_id === tutorial.id).length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={sortedByLikes.length}
                                rowsPerPage={tutorialsRowsPerPage}
                                page={tutorialsPage}
                                onPageChange={handleTutorialsPageChange}
                                onRowsPerPageChange={handleTutorialsRowsPerPageChange}
                                labelRowsPerPage="Rows per page"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Most Commented Tutorials</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Comments</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedByComments.slice(commentsPage * commentsRowsPerPage, commentsPage * commentsRowsPerPage + commentsRowsPerPage).map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell>{tutorial.id}</TableCell>
                                            <TableCell>{tutorial.titre}</TableCell>
                                            <TableCell>{comments.filter(comment => comment.tutorial_id === tutorial.id).length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={sortedByComments.length}
                                rowsPerPage={commentsRowsPerPage}
                                page={commentsPage}
                                onPageChange={handleCommentsPageChange}
                                onRowsPerPageChange={handleCommentsRowsPerPageChange}
                                labelRowsPerPage="Rows per page"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreatorDashboard;
