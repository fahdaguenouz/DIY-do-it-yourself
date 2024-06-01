import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AnalyticEcommerce from './AnalyticEcommerce';
import { getTutorials, getUsers, getComment, getLike, getSignal } from '@/Redux/authActions';

const CreatorDashboard = () => {
    const { baseUrl, signals = [], users = [], tutorials = [], comments = [], likes = [], user, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
        dispatch(getComment());
        dispatch(getLike());
        dispatch(getSignal());
    }, [dispatch]);

    const [tutorialsPage, setTutorialsPage] = useState(0);
    const [creatorsPage, setCreatorsPage] = useState(0);
    const rowsPerPage = 5;

    const handleTutorialsPageChange = (event, newPage) => {
        setTutorialsPage(newPage);
    };

    const handleCreatorsPageChange = (event, newPage) => {
        setCreatorsPage(newPage);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Filter tutorials by the logged-in user
    const userTutorials = tutorials.filter(tutorial => tutorial.user_id === user.id);

    // Calculate counts
    const tutorialCount = userTutorials.length;
    const commentCount = comments.filter(comment => userTutorials.some(tutorial => tutorial.id === comment.tutorial_id)).length;
    const likeCount = likes.length > 0 ? likes.filter(like => userTutorials.some(tutorial => tutorial.id === like.tutorial_id)).length : 0;
    const signalCount = signals.length > 0 ? signals.filter(signal => userTutorials.some(tutorial => tutorial.id === signal.tutorial_id)).length : 0;

    // Sort tutorials by likes and comments
    const mostLikedTutorials = [...userTutorials].sort((a, b) => {
        const aLikes = likes.length > 0 ? likes.filter(like => like.tutorial_id === a.id).length : 0;
        const bLikes = likes.length > 0 ? likes.filter(like => like.tutorial_id === b.id).length : 0;
        return bLikes - aLikes;
    });

    const mostCommentedTutorials = [...userTutorials].sort((a, b) => {
        const aComments = comments.filter(comment => comment.tutorial_id === a.id).length;
        const bComments = comments.filter(comment => comment.tutorial_id === b.id).length;
        return bComments - aComments;
    });

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Tutorials" count={tutorialCount.toString()} percentage={59.3} extra={tutorialCount.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Comments" count={commentCount.toString()} percentage={70.5} extra={commentCount.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Likes" count={likeCount.toString()} percentage={27.4}  extra={likeCount.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Signals" count={signalCount.toString()} percentage={27.4} isLoss color="warning" extra={signalCount.toString()} />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Most Liked Tutorials</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Likes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mostLikedTutorials.slice(0, 5).map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell>{tutorial.id}</TableCell>
                                            <TableCell>{tutorial.titre}</TableCell>
                                            <TableCell>{likes.length > 0 ? likes.filter(like => like.tutorial_id === tutorial.id).length : 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Most Commented Tutorials</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Comments</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mostCommentedTutorials.slice(0, 5).map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell>{tutorial.id}</TableCell>
                                            <TableCell>{tutorial.titre}</TableCell>
                                            <TableCell>{comments.filter(comment => comment.tutorial_id === tutorial.id).length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreatorDashboard;
