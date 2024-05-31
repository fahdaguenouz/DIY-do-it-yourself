// src/pages/SignaledTutorials.js

import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignal } from '@/Redux/authActions';

const SignaledTutorials = () => {
    const signals = useSelector(state => state.auth.signals);    const navigate = useNavigate();
    const dispatch =useDispatch()
    useEffect(() => {
        dispatch(getSignal())
    }, [dispatch]);

    const handleVisit = (tutorialId) => {
        navigate(`/all/category/subcategory/tutorialsdeatail/${tutorialId}`);
    };

    const handleConfirm = (signalId) => {
       dispatch(AddSignal( signalId ))

       
    };

    return (
        <Container>
            <h1>Moderator Dashboard</h1>
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
                    {signals.map((signal) => (
                        <TableRow key={signal.id}>
                            <TableCell>{signal.id}</TableCell>
                            <TableCell>{signal.tutorial.title}</TableCell>
                            <TableCell>{signal.reason}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleVisit(signal.tutorial_id)}>Visit</Button>
                                <Button onClick={() => handleConfirm(signal.id)}>Confirm</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default SignaledTutorials;
