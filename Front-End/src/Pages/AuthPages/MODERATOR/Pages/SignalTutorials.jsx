import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignal, getTutorials } from '@/Redux/authActions';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignalTutorials = () => {
    const dispatch = useDispatch();
    const { signals, tutorials } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSignal());
        dispatch(getTutorials());
    }, [dispatch]);

    if (!signals || !tutorials) {
        return <div>Loading...</div>;
    }

    const handleVisit = (tutorialId) => {
        navigate(`/all/category/subcategory/tutorialsdeatail/${tutorialId}`);
    };

    // Filter tutorials with status 'suspended'
    const suspendedSignals = signals.filter(signal => {
        const tutorial = tutorials.find(tutorial => tutorial.id === signal.tutorial_id);
        return tutorial && tutorial.status === 'suspended';
    });

    // Group reasons by tutorial ID and include user information
    const tutorialMap = suspendedSignals.reduce((acc, signal) => {
        const tutorial = tutorials.find(tutorial => tutorial.id === signal.tutorial_id);
        const user = tutorial ? tutorial.user : null;

        if (!acc[signal.tutorial_id]) {
            acc[signal.tutorial_id] = { ...tutorial, reasons: [], user };
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
                        <TableCell>User</TableCell>
                        <TableCell>Reasons</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tutorialsArray.map((tutorial) => (
                        <TableRow key={tutorial.id}>
                            <TableCell>{tutorial.id}</TableCell>
                            <TableCell>{tutorial.titre}</TableCell>
                            <TableCell>{tutorial.user ? `${tutorial.user.nom} ${tutorial.user.prenom}` : 'Unknown'}</TableCell>
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
