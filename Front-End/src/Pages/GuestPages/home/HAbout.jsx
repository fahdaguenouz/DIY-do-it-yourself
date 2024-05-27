import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import { coursesCard } from "@/dummydata";

const HAbout = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <>
      <section className='homeAbout'>
        <Box sx={{ padding: '0 50px' }}>
          <Heading subtitle='Our Tutorials' title='Explore Our Popular Tutorials' />
          <Grid container spacing={3}>
            {coursesCard.slice(0, 3).map((val, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  textAlign: 'center',
                  padding: 3,
                  backgroundColor: '#fff'
                }}>
                  <Box sx={{ width: '100%', height: 200, position: 'relative', backgroundColor: '#039ee3' }}>
                    <CardMedia
                      component="img"
                      image={val.cover}
                      alt={val.coursesName}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h5" component="div">{val.coursesName}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, color: '#039ee3' }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star" />
                      ))}
                      <Typography component="label" sx={{ ml: 0.5 }}>(5.0)</Typography>
                    </Box>
                    {val.courTeacher.map((detail, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', color: 'grey', margin: '20px 0' }}>
                        <Avatar src={detail.dcover} alt={detail.name} sx={{ width: 50, height: 50, mr: 2 }} />
                        <Typography variant="body1">{detail.name}</Typography>
                        <Typography sx={{ color: '#039ee3', fontWeight: '500', fontSize: '14px', ml: 2 }}>{detail.totalTime}</Typography>
                      </Box>
                    ))}
                    <Box sx={{ backgroundColor: '#f8f8f8', padding: 1, margin: '30px 0' }}>
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
                    >
                      VISIT NOW!
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <OnlineCourses />
      </section>
    </>
  );
};

export default HAbout;
