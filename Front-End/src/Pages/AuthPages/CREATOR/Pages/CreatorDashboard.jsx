import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import AnalyticEcommerce from './AnalyticEcommerce';
import { getTutorials, getUsers } from '@/Redux/authActions';

const AdminDashboard = () => {
    const { baseUrl, users, tutorials,categories ,user, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    console.log(categories);
    useEffect(() => {
        dispatch(getTutorials());
        dispatch(getUsers());
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
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>;
    }

    const tutorialCreators = tutorials.reduce((acc, tutorial) => {
        const creatorId = tutorial.user.id;
        if (!acc[creatorId]) {
            acc[creatorId] = { ...tutorial.user, tutorialCount: 0 };
        }
        acc[creatorId].tutorialCount++;
        return acc;
    }, {});

    const topCreators = Object.values(tutorialCreators).sort((a, b) => b.tutorialCount - a.tutorialCount);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Tutorials" count={tutorials.length.toString()} percentage={59.3} extra={tutorials.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={users.length.toString()} percentage={70.5} extra={users.length.toString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Signals" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Blogs" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Tutorials</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Created At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tutorials.slice(tutorialsPage * rowsPerPage, tutorialsPage * rowsPerPage + rowsPerPage).map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell>{tutorial.id}</TableCell>
                                            <TableCell>{tutorial.titre}</TableCell>
                                            <TableCell>{tutorial.description}</TableCell>
                                            <TableCell>{tutorial.created_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={tutorials.length}
                            rowsPerPage={rowsPerPage}
                            page={tutorialsPage}
                            onPageChange={handleTutorialsPageChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Top Creators</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Tutorials Created</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {topCreators.slice(creatorsPage * rowsPerPage, creatorsPage * rowsPerPage + rowsPerPage).map((creator) => (
                                        <TableRow key={creator.id}>
                                            <TableCell>{creator.id}</TableCell>
                                            <TableCell>{creator.nom} {creator.prenom}</TableCell>
                                            <TableCell>{creator.email}</TableCell>
                                            <TableCell>{creator.tutorialCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={topCreators.length}
                            rowsPerPage={rowsPerPage}
                            page={creatorsPage}
                            onPageChange={handleCreatorsPageChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AdminDashboard;
