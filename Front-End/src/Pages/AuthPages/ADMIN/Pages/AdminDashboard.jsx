import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AnalyticEcommerce from './AnalyticEcommerce';
import { getTutorials, getUsers, getCategory, getSignal } from '@/Redux/authActions';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const { signals = [], users = [], tutorials = [], categories = [], loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [tutorialsPage, setTutorialsPage] = useState(0);
    const [creatorsPage, setCreatorsPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
        dispatch(getCategory());
        dispatch(getSignal());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].id);
        }
    }, [categories]);

    const rowsPerPage = 5;

    const handleTutorialsPageChange = (event, newPage) => {
        setTutorialsPage(newPage);
    };

    const handleCreatorsPageChange = (event, newPage) => {
        setCreatorsPage(newPage);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const tutorialCreators = tutorials.reduce((acc, tutorial) => {
        const creatorId = tutorial.user.id;
        if (!acc[creatorId]) {
            acc[creatorId] = { ...tutorial.user, tutorialCount: 0 };
        }
        acc[creatorId].tutorialCount++;
        return acc;
    }, {});

    const topCreators = Object.values(tutorialCreators).sort((a, b) => b.tutorialCount - a.tutorialCount);

    const categoryData = selectedCategory ? categories.find(category => category.id === selectedCategory) : null;

    const tutorialDataByCategory = categoryData ? {
        labels: categoryData.subcategories.map(subcategory => subcategory.name),
        datasets: [
            {
                label: `Number of Tutorials in ${categoryData.name}`,
                data: categoryData.subcategories.map(subcategory => {
                    return tutorials.filter(tutorial => tutorial.sub_category.id === subcategory.id).length;
                }),
                backgroundColor: 'rgba(33, 150, 243, 0.6)', // Primary blue background color
                borderColor: 'rgba(33, 150, 243, 1)', // Primary blue border color
                borderWidth: 1,
            },
        ],
    } : null;

    const userData = {
        labels: Object.values(tutorialCreators).map(creator => `${creator.nom} ${creator.prenom}`),
        datasets: [
            {
                label: 'Tutorials Created',
                data: Object.values(tutorialCreators).map(creator => creator.tutorialCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const tutorialsByCategoryData = {
        labels: categories.map(category => category.name),
        datasets: [
            {
                label: 'Number of Tutorials by Category',
                data: categories.map(category => {
                    return category.subcategories.reduce((count, subcategory) => {
                        return count + tutorials.filter(tutorial => tutorial.sub_category.id === subcategory.id).length;
                    }, 0);
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red background color
                borderColor: 'rgba(255, 99, 132, 1)', // Red border color
                borderWidth: 1,
            },
        ],
    };

    // Signal Chart Data
    const suspendedTutorials = tutorials.filter(tutorial => tutorial.status === 'suspended');
    const chartData = {
        labels: suspendedTutorials.map(tutorial => tutorial.titre),
        datasets: [
            {
                label: 'Number of Signals',
                data: suspendedTutorials.map(tutorial => {
                    const tutorialSignals = signals.filter(signal => signal.tutorial_id === tutorial.id);
                    return tutorialSignals.length;
                }),
                backgroundColor: 'rgba(255, 165, 0, 0.6)', // Orange background color with 60% opacity
                borderColor: 'rgba(255, 165, 0, 1)' ,
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Tutorials" count={tutorials.length.toString()} percentage={59.3} extra={tutorials.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={users.length.toString()} percentage={70.5} extra={users.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Signals" count={signals.length.toString()} percentage={27.4} isLoss color="warning" extra={signals.length.toString()} />
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h6" mb="5px">Tutorials by Category and Subcategory</Typography>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Select Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={selectedCategory}
                        label="Select Category"
                        onChange={handleCategoryChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {tutorialDataByCategory && (
                    <Box sx={{ height: 400, marginTop: 4 }}>
                        <Bar
                            data={tutorialDataByCategory}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        beginAtZero: true,
                                        maxBarThickness: 50,
                                    },
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: `Number of Tutorials by Subcategory in ${categoryData.name}` }
                                }
                            }}
                        />
                    </Box>
                )}
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h6">Tutorials by Top 10 Creator</Typography>
                <Box sx={{ height: 400, marginTop: 4 }}>
                    <Bar
                        data={userData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    maxBarThickness: 50,
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Number of Tutorials Created by Users' }
                            }
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography variant="h6">Number of Tutorials by Category</Typography>
                <Box sx={{ height: 400, marginTop: 4 }}>
                    <Bar
                        data={tutorialsByCategoryData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    maxBarThickness: 50,
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Number of Tutorials by Category' }
                            }
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={8}>
                <Typography variant="h6">Suspended Tutorials and their Signals</Typography>
                <Box sx={{ height: 400, marginTop: 4 }}>
                    <Bar
                        data={chartData}
                        options={chartOptions}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;
