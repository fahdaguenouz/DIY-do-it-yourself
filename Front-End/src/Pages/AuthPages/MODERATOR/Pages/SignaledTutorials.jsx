import React, { useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignal, confirmSignal } from '@/Redux/authActions';

const SignaledTutorials = () => {
    const { signals } = useSelector(state => state.auth); // Ensure this points to the correct state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignal());
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

    if (!signals) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Active Signaled Tutorials</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tutorial Title</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activeTutorials.map((signal) => (
                        <TableRow key={signal.id}>
                            <TableCell>{signal.id}</TableCell>
                            <TableCell>{signal.tutorial.titre}</TableCell>
                            <TableCell>{signal.reason}</TableCell>
                            <TableCell>
                                <Button className='btn btn-outline-primary' onClick={() => handleVisit(signal.tutorial_id)}>Visit</Button>
                                <Button className='btn btn-outline-primary' onClick={() => handleConfirm(signal.id, signal.tutorial_id)}>Confirm</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default SignaledTutorials;
