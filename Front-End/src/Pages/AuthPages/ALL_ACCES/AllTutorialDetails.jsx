import React, { useEffect } from 'react';
import { CircularProgress, Rating, TextField, Button, Card, CardContent, Typography, Container, Grid, Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorials } from '@/Redux/authActions';

const AllTutorialDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTutorials());
    }, [dispatch]);

    const { tutorials, baseUrl } = useSelector(state => state.auth);
    const tutorial = tutorials.find(t => t.id === parseInt(id));

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
                        <Box sx={{ textAlign: { xs: 'center', md: 'center' } }}>
                            <Typography variant="h5" gutterBottom>Category: {tutorial.sub_category.name}</Typography>
                            <Typography variant="h5" gutterBottom>Subcategory: {tutorial.sub_category.name}</Typography>
                            <Typography variant="body1" gutterBottom>Description: {tutorial.description}</Typography>
        
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
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" gutterBottom>Rate this tutorial:</Typography>
                        <Rating name="rating" defaultValue={0} max={5} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField
                            label="Leave a comment"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="outlined">Submit</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AllTutorialDetails;
