// import './courses.css';
import { Box, Card, CardContent, CardMedia, Typography, Button, Stack, Avatar, Chip, Grid } from '@mui/material';

import React from 'react';

import { coursesCard } from '@/dummydata';
import { useNavigate } from 'react-router-dom';

const CoursesCard = () => {
    const navigate=useNavigate()
    const handleButtonClick = () => {
        navigate('/login');
      };
  return (
    <>
      <Grid container spacing={3} sx={{ padding: '0 50px' }}>
            {coursesCard.map((val, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{
                        textAlign: 'center',
                        padding: 3,
                        backgroundColor: '#fff'
                    }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={val.cover}
                            alt=""
                            sx={{ backgroundColor: '#039ee3' }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">{val.coursesName}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, color: '#039ee3' }}>
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fa fa-star" />
                                ))}
                                <Typography component="label" sx={{ ml: 0.5 }}>(5.0)</Typography>
                            </Box>
                            {val.courTeacher.map((detail, i) => (
                                <Box key={i} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'grey',
                                    margin: '20px 0'
                                }}>
                                    <Avatar src={detail.dcover} alt={detail.name} sx={{
                                        width: 50,
                                        height: 50,
                                        mr: 2
                                    }} />
                                    <Typography variant="body1">{detail.name}</Typography>
                                    <Typography sx={{ color: '#039ee3', fontWeight: '500', fontSize: '14px', ml: 2 }}>{detail.totalTime}</Typography>
                                </Box>
                            ))}
                            <Box sx={{
                                backgroundColor: '#f8f8f8',
                                padding: 1,
                                margin: '30px 0'
                            }}>
                                <Typography variant="h6" color="primary">{val.priceAll}</Typography>
                            </Box>
                            <Button 
                      variant="outlined"
                      onClick={handleButtonClick}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#039ee3',
                          color: '#fff',
                          borderColor: '#039ee3',
                        }
                      }}
                    >Visit Now!</Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>
  )
}

export default CoursesCard
