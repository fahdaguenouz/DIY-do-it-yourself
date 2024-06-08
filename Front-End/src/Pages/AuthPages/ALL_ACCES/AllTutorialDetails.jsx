import React, { useEffect, useState } from 'react';
import { CircularProgress, TextField, Button, Card, CardContent, Typography, Container, Grid, Box, Paper, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddSignal, getTutorials, likeTutorial, getLike, CommentTutorial, getComment, getUsers } from '@/Redux/authActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WarningIcon from '@mui/icons-material/Warning';

const AllTutorialDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [customReason, setCustomReason] = useState('');
    const [comment, setComment] = useState('');

    const userId = useSelector(state => state.auth.user.id);
    const { tutorials, likes, comments, users, baseUrl, user, loading } = useSelector(state => state.auth);
    const tutorial = tutorials.find(t => t.id === parseInt(id));
    const tutorialLikes = likes.filter(like => like.tutorial_id === parseInt(id));
    const userLike = tutorialLikes.find(like => like.user_id === user.id);

    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getLike(id));
        dispatch(getComment(id));
        dispatch(getUsers());
    }, [dispatch, id]);

    const handleLike = () => {
        dispatch(likeTutorial(id, userId, () => {
            dispatch(getLike(id));
        }));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (reason) => {
        setCustomReason(reason);
        setDialogOpen(true);
        handleCloseMenu();
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCustomReason('');
    };

    const handleSubmit = () => {
        dispatch(AddSignal({ tutorial_id: id, reason: customReason }, handleCloseDialog));
    };

    const handleCommentSubmit = () => {
        dispatch(CommentTutorial(id, userId, comment, () => {
            setComment('');
            dispatch(getComment(id));
        }));
    };

    if (loading || !tutorial) {
        return (
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (tutorial.status === 'suspended') {
        return (
            <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <Typography variant="h6" color="error" gutterBottom>
                    This tutorial is suspended due to inappropriate content or spam.
                </Typography>
                <WarningIcon color="error" style={{ fontSize: "4rem" }} />
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginBottom: "20px" }}>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">{tutorial.titre}</Typography>
                </Grid>
                <Grid item>
                    <ErrorOutlineIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => handleMenuItemClick('Inappropriate Content')}>Inappropriate Content</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Spam')}>Spam</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Other')}>Other</MenuItem>
                    </Menu>
                    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle>Signal Tutorial</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Reason for signaling"
                                type="text"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                            <Button onClick={handleSubmit} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <Card sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img alt={tutorial.titre} src={`${baseUrl}storage/${tutorial.cover}`} style={{ width: "100%", height: "auto", borderRadius: "8px", maxHeight: "300px", objectFit: "cover" }} />
                    </Grid>
                    <Grid item xs={12} md={7} style={{ padding: "20px" }}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'center' } }}>
                            <Typography variant="h5" gutterBottom>Category: {tutorial.sub_category.name}</Typography>
                            <Typography variant="h5" gutterBottom>Subcategory: {tutorial.sub_category.name}</Typography>
                            <Typography variant="body1" gutterBottom>Description: {tutorial.description}</Typography>
                            <Typography variant="body2" color="textSecondary">Created on: {new Date(tutorial.created_at).toLocaleDateString()}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <Grid container spacing={2} justifyContent="center">
                {tutorial.media.map((media, index) => (
                    <Grid item xs={12} sm={10} md={8} key={index} sx={{ mb: 2 }}>
                        <Card variant="outlined" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                            {media.media_type === 'photo' ? (
                                <img src={`${baseUrl}storage/${media.media_url}`} alt={`Media ${index + 1}`} style={{ width: '40%', height: 'auto', marginRight: '10px', borderRadius: '8px' }} />
                            ) : (
                                <video src={`${baseUrl}storage/${media.media_url}`} controls style={{ width: '40%', height: 'auto', marginRight: '10px', borderRadius: '8px' }} />
                            )}
                            <CardContent style={{ flex: 1 }}>
                                <Typography variant="h6">Etape: {index + 1}</Typography>
                                <Typography variant="body1"><b>Description:</b> {media.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Paper elevation={3} style={{ marginTop: "30px", padding: "20px" }}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5">Like this tutorial</Typography>
                    <Button
                        variant="contained"
                        color={userLike ? "secondary" : "primary"}
                        onClick={handleLike}
                        startIcon={<ThumbUpIcon />}
                        sx={{ backgroundColor: userLike ? 'gray' : 'primary.main' }}
                    >
                        {userLike ? "Unlike" : "Like"}
                    </Button>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {tutorialLikes.length} {tutorialLikes.length === 1 ? 'like' : 'likes'}
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Comments</Typography>
                    {comments && comments.filter(comment => comment.tutorial_id === parseInt(id)).map((comment, index) => {
                        const userComment = users.find(u => u.id === comment.user_id);
                        return (
                            <Box key={index} sx={{ mt: 4 }}>
                                <Typography variant="body1"><b>{userComment ? userComment.nom : 'Unknown User'}:</b> {comment.description}</Typography>
                                <Typography variant="body2" color="textSecondary">Commented on: {new Date(comment.created_at).toLocaleDateString()}</Typography>
                            </Box>
                        );
                    })}
                    <TextField
                        label="Leave a comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentSubmit}
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AllTutorialDetails;
