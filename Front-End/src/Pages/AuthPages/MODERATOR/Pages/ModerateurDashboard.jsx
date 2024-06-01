import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import AnalyticEcommerce from '../../ADMIN/Pages/AnalyticEcommerce';
import { getSignal, getTutorials } from '@/Redux/authActions';
import { Bar } from 'react-chartjs-2';

const ModerateurDashboard = () => {
    const dispatch = useDispatch();
    const { signals, tutorials } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
    }, [dispatch]);

    if (!signals || !tutorials) {
        return <div>Loading...</div>;
    }

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
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
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

    const tutorialsWithSignals = suspendedTutorials.map(tutorial => {
        const tutorialSignals = signals.filter(signal => signal.tutorial_id === tutorial.id);
        return { ...tutorial, signals: tutorialSignals.length };
    });

    const sortedTutorials = tutorialsWithSignals.sort((a, b) => b.signals - a.signals);

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
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography variant="h4" mt="20px" gutterBottom>
                    Tutorials with the Most Signals
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Number of Signals</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTutorials.map(tutorial => (
                            <TableRow key={tutorial.id}>
                                <TableCell>{tutorial.id}</TableCell>
                                <TableCell>{tutorial.titre}</TableCell>
                                <TableCell>{tutorial.signals}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    );
};

export default ModerateurDashboard;
