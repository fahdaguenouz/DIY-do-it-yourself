import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignal, getTutorials } from '@/Redux/authActions';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignalTutorials = () => {
    const dispatch = useDispatch();
    const { signals } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
    }, [dispatch]);

    if (!signals) {
        return <div>Loading...</div>;
    }

    const handleVisit = (tutorialId) => {
        navigate(`/all/category/subcategory/tutorialsdeatail/${tutorialId}`);
    };

    // Filter tutorials with status 'suspended'
    const suspendedTutorials = signals.filter(signal => signal.tutorial.status === 'suspended');

    // Group reasons by tutorial ID
    const tutorialMap = suspendedTutorials.reduce((acc, signal) => {
        if (!acc[signal.tutorial_id]) {
            acc[signal.tutorial_id] = { ...signal.tutorial, reasons: [] };
        }
        acc[signal.tutorial_id].reasons.push(signal.reason);
        return acc;
    }, {});

    const tutorialsArray = Object.values(tutorialMap);

    return (
        <Container>
            <h1>Suspended Tutorials</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Reasons</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tutorialsArray.map((tutorial) => (
                        <TableRow key={tutorial.id}>
                            <TableCell>{tutorial.id}</TableCell>
                            <TableCell>{tutorial.titre}</TableCell>
                            <TableCell>
                                <ul>
                                    {tutorial.reasons.map((reason, index) => (
                                        <li key={index}>{reason}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>
                                <Button className='btn btn-outline-primary' onClick={() => handleVisit(tutorial.id)}>Visit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default SignalTutorials;
