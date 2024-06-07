import React, { useEffect, useState } from 'react';
import { CircularProgress, Rating, TextField, Button, Card, CardContent, Typography, Container, Grid, Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, getLike, getTutorials, getUsers, likeTutorial } from '@/Redux/authActions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const TutorialDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
 
    const [comment, setComment] = useState('');

    const userId = useSelector(state => state.auth.user.id);
    const { tutorials, likes, comments, users, baseUrl, user } = useSelector(state => state.auth);
    const tutorial = tutorials.find(t => t.id === parseInt(id));
    const tutorialLikes = likes.filter(like => like.tutorial_id === parseInt(id));
    const userLike=tutorialLikes.find(like=>like.user_id===user.id)
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

    const handleCommentSubmit = () => {
        dispatch(CommentTutorial(id, userId, comment, () => {
            setComment('');
            dispatch(getComment(id));
        }));
    };
    const handleUpdate = () => {
        navigate(`/creator/update-tutorial/${id}`);
    };
 
    if (!tutorial) {
        return (
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Container>
        );
    }
 
    return (
        <Container>
            {tutorial.status === 'suspended' && (
                <Box sx={{ mb: 2, p: 2, backgroundColor: 'red', color: 'white', borderRadius: '8px' }}>
                    <Typography variant="h6">This tutorial is suspended due to inappropriate content or spam.</Typography>
                </Box>
            )}
            <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginBottom: "20px" }}>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">{tutorial.titre}</Typography>
                </Grid>
            </Grid>
            <Card sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img alt={tutorial.titre} src={`${baseUrl}storage/${tutorial.cover}`} style={{ width: "100%", height: "auto", borderRadius: "8px", maxHeight: "300px", objectFit: "cover" }} />
                    </Grid>
                    <Grid item xs={12} md={7} style={{ padding: "20px" }}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h5" gutterBottom>Category: {tutorial.sub_category.name}</Typography>
                            <Typography variant="h5" gutterBottom>Subcategory: {tutorial.sub_category.name}</Typography>
                            <Typography variant="body1" gutterBottom>Description: {tutorial.description}</Typography>
                            <Box display="flex" justifyContent={{ xs: 'center', md: 'center' }} marginTop="20px">
                                <Button variant="contained" color="primary" onClick={handleUpdate}>
                                    Update Tutorial
                                </Button>
                            </Box>
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
 
export default TutorialDetails;