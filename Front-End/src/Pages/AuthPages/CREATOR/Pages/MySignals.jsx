import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSignal, getTutorials } from '@/Redux/authActions';

const MySignals = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signals, tutorials, user, loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
    }, [dispatch]);

    if (loading || !signals || !tutorials) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Filter the signals for the current user's tutorials
    const mySignaledTutorials = signals.filter(signal => {
        const tutorial = tutorials.find(tut => tut.id === signal.tutorial_id);
        return tutorial && tutorial.user_id === user.id;
    });

    const handleViewTutorial = (tutorialId, tutorialTitle) => {
        navigate(`/creator/tutorial-detail/${tutorialId}/${encodeURIComponent(tutorialTitle)}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                My Signaled Tutorials
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tutorial Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mySignaledTutorials.map(signal => {
                        const tutorial = tutorials.find(tut => tut.id === signal.tutorial_id);
                        return (
                            <TableRow key={signal.id}>
                                <TableCell>{signal.id}</TableCell>
                                <TableCell>{tutorial ? tutorial.titre : 'Unknown'}</TableCell>
                                <TableCell>{signal.reason}</TableCell>
                                <TableCell>{new Date(signal.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewTutorial(tutorial.id, tutorial.titre)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Container>
    );
}

export default MySignals;
