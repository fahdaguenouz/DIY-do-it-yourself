import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getComment } from '@/Redux/authActions';

const AdminComments = () => {
    const dispatch = useDispatch();
    const { comments, user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getComment());
    }, [dispatch]);

    // Filter comments to display only those made by the logged-in user
    const userComments = comments.filter(comment => comment.user_id === user.id);

    return (
        <Container>
            <h1>Your Comments</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Tutorial</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userComments.map((comment) => (
                        <TableRow key={comment.id}>
                            
                            <TableCell>{comment.id}</TableCell>
                            <TableCell>{comment.description}</TableCell>
                            <TableCell> {new Date(comment.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{comment.tutorial ? comment.tutorial.titre : 'Unknown'}</TableCell>
                            <TableCell>
                                <Button
                                    component={Link}
                                    to={`/all/category/subcategory/tutorialsdeatail/${comment.tutorial_id}`}
                                    variant="outlined"
                                >
                                    Visit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminComments;
