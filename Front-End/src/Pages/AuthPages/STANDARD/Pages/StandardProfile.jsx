import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon
} from '@mui/icons-material';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function StandardProfile() {

    const { baseUrl, user, authenticated, loading } = useSelector((state) => state.auth);

    return (
        <Box sx={{ bgcolor: '#f9f9fa', py: 3, display: 'flex', justifyContent: 'center' }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <Grid container>
                            <Grid item xs={12} md={4} sx={{ bgcolor: 'linear-gradient(to right, #afadad, #a09c9b)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', p: 2 }}>
                                <Avatar src={`${baseUrl}${user.profile_picture}`} sx={{ width: 100, height: 100, mb: 2 }} />
                                <Typography variant="h6" fontWeight="600">Hembo Tingor</Typography>
                                <Typography variant="body2">Web Designer</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="600" gutterBottom>Information</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" fontWeight="600">Nom</Typography>
                                            <Typography variant="body2" color="textSecondary">{user.nom}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" fontWeight="600">Prenom</Typography>
                                            <Typography variant="body2" color="textSecondary">{user.prenom}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" fontWeight="600">Email</Typography>
                                            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" fontWeight="600">Adress</Typography>
                                            <Typography variant="body2" color="textSecondary">{user.adress}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                                        <Tooltip title="Facebook" arrow>
                                            <IconButton href="#!" sx={{ color: 'inherit' }}>
                                                <FacebookIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Twitter" arrow>
                                            <IconButton href="#!" sx={{ color: 'inherit' }}>
                                                <TwitterIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Instagram" arrow>
                                            <IconButton href="#!" sx={{ color: 'inherit' }}>
                                                <InstagramIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <EditOutlined sx={{ fontSize: '1.5rem',display: 'flex', justifyContent: 'flex-end', mr: 4 }} />
                                    </Box>

                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
