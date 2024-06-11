import React, { useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignal, getTutorials, getUsers, confirmSignal } from '@/Redux/authActions';

const SignaledTutorials = () => {
    const { signals, tutorials, users, loading } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
        dispatch(getUsers());
    }, [dispatch]);

    const handleVisit = (tutorialId) => {
        navigate(`/all/category/subcategory/tutorialsdeatail/${tutorialId}`);
    };

    const handleConfirm = (signalId, tutorialId) => {
        dispatch(confirmSignal(signalId, () => {
            dispatch(getSignal()); // Refresh the signals after confirmation
        }));
    };

    const activeTutorials = signals.filter(signal => signal.tutorial.status === 'active');

    if (loading || !signals || !tutorials || !users) {
        return (
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <h1>Active Signaled Tutorials</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tutorial Title</TableCell>
                        <TableCell>Creator</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activeTutorials.map((signal) => {
                        const tutorial = tutorials.find(tut => tut.id === signal.tutorial_id);
                        const creator = tutorial ? users.find(user => user.id === tutorial.user_id) : null;
                        return (
                            <TableRow key={signal.id}>
                                <TableCell>{signal.id}</TableCell>
                                <TableCell>{signal.tutorial.titre}</TableCell>
                                <TableCell>{creator ? `${creator.nom} ${creator.prenom}` : 'Unknown'}</TableCell>
                                <TableCell>{signal.reason}</TableCell>
                                <TableCell>
                                    <Button className='btn btn-outline-primary' onClick={() => handleVisit(signal.tutorial_id)}>Visit</Button>
                                    <Button className='btn btn-outline-primary' onClick={() => handleConfirm(signal.id, signal.tutorial_id)}>Confirm</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Container>
    );
};

export default SignaledTutorials;
