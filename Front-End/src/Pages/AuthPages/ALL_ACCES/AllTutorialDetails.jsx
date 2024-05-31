import React, { useEffect, useState } from 'react';
import { CircularProgress, Rating, TextField, Button, Card, CardContent, Typography, Container, Grid, Box, Paper, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddSignal, getTutorials } from '@/Redux/authActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AllTutorialDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [customReason, setCustomReason] = useState('');

    useEffect(() => {
        dispatch(getTutorials());
    }, [dispatch]);

    const { tutorials, baseUrl } = useSelector(state => state.auth);
    const tutorial = tutorials.find(t => t.id === parseInt(id));

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
