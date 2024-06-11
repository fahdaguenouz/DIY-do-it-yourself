import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import AnalyticEcommerce from '../../ADMIN/Pages/AnalyticEcommerce';
import { getSignal, getTutorials } from '@/Redux/authActions';
import { Bar } from 'react-chartjs-2';
import { format, isToday, isYesterday, isThisMonth, isThisYear, subMonths, subYears, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const ModerateurDashboard = () => {
    const dispatch = useDispatch();
    const { signals, tutorials, loading } = useSelector(state => state.auth);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
    }, [dispatch]);

    const filterSignals = (signals) => {
        switch (filter) {
            case 'today':
                return signals.filter(signal => isToday(new Date(signal.created_at)));
            case 'yesterday':
                return signals.filter(signal => isYesterday(new Date(signal.created_at)));
            case 'thisMonth':
                return signals.filter(signal => {
                    const signalDate = new Date(signal.created_at);
                    return signalDate >= startOfMonth(new Date()) && signalDate <= endOfMonth(new Date());
                });
            case 'lastMonth':
                const lastMonth = subMonths(new Date(), 1);
                return signals.filter(signal => {
                    const signalDate = new Date(signal.created_at);
                    return signalDate >= startOfMonth(lastMonth) && signalDate <= endOfMonth(lastMonth);
                });
            case 'thisYear':
                return signals.filter(signal => {
                    const signalDate = new Date(signal.created_at);
                    return signalDate >= startOfYear(new Date()) && signalDate <= endOfYear(new Date());
                });
            case 'lastYear':
                const lastYear = subYears(new Date(), 1);
                return signals.filter(signal => {
                    const signalDate = new Date(signal.created_at);
                    return signalDate >= startOfYear(lastYear) && signalDate <= endOfYear(lastYear);
                });
            default:
                return signals;
        }
    };

    const filteredSignals = filterSignals(signals);

    const getTutorialSignalCounts = (signals) => {
        const tutorialSignalCounts = {};
        signals.forEach(signal => {
            const tutorialId = signal.tutorial_id;
            if (!tutorialSignalCounts[tutorialId]) {
                tutorialSignalCounts[tutorialId] = {
                    tutorial: signal.tutorial,
                    count: 0
                };
            }
            tutorialSignalCounts[tutorialId].count += 1;
        });
        return Object.values(tutorialSignalCounts);
    };

    const tutorialSignalCounts = getTutorialSignalCounts(filteredSignals);

    const suspendedTutorials = tutorials.filter(tutorial => tutorial.status === 'suspended');
    const suspendedTutorialsCount = suspendedTutorials.length;
    const totalSignalsCount = signals.length;

    const chartData = {
        labels: suspendedTutorials.map(tutorial => tutorial.titre),
        datasets: [
            {
                label: 'Number of Signals',
                data: suspendedTutorials.map(tutorial => {
                    const tutorialSignals = signals.filter(signal => signal.tutorial_id === tutorial.id);
                    return tutorialSignals.length;
                }),
                backgroundColor: 'rgba(255, 165, 0, 0.6)',
                borderColor: 'rgba(255, 165, 0, 1)',
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
    if (loading || !signals || !tutorials ) {
        return (
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Container>
        );
    }
    return (
        <Container>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Total Tutorials Suspended"
                        count={suspendedTutorialsCount.toString()}
                        percentage={59.3}
                        extra={suspendedTutorialsCount.toString()}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Total Signals"
                        count={totalSignalsCount.toString()}
                        percentage={27.4}
                        isLoss
                        color="warning"
                        extra={totalSignalsCount.toString()}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" mt="20px" gutterBottom>
                    Suspended Tutorials and their Signals
                </Typography>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography variant="h4" mt="20px" gutterBottom>
                    Tutorials with the Most Signals
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Date Filter</InputLabel>
                    <Select
                        value={filter}
                        label="Date Filter"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="yesterday">Yesterday</MenuItem>
                        <MenuItem value="thisMonth">This Month</MenuItem>
                        <MenuItem value="lastMonth">Last Month</MenuItem>
                        <MenuItem value="thisYear">This Year</MenuItem>
                        <MenuItem value="lastYear">Last Year</MenuItem>
                    </Select>
                </FormControl>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Number of Signals</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tutorialSignalCounts.map(({ tutorial, count }) => (
                            <TableRow key={tutorial.id}>
                                <TableCell>{tutorial.id}</TableCell>
                                <TableCell>{tutorial.titre}</TableCell>
                                <TableCell>{count}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/all/category/subcategory/tutorialsdeatail/${tutorial.id}`}
                                        variant="contained"
                                        color="primary"
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    );
};

export default ModerateurDashboard;
