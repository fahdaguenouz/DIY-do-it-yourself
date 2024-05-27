import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { online } from "@/dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <Button variant="outlined" color="primary">
          Ajouter
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Heading subtitle='Categories' title='Explore Our DIY Categories' />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Grid container spacing={3}>
            {online.map((val) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={val.courseName}>
                <Link to={`/login`} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      boxShadow: '0 5px 25px -2px rgb(0 0 0 / 6%)',
                      backgroundColor: '#fff',
                      padding: '20px 10px',
                      transition: '0.5s',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: '#039ee3',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      },
                      '&:hover .imgHover': {
                        opacity: 1,
                      },
                      '&:hover h6': {
                        color: '#fff',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', width: 80, height: 80, margin: 'auto' }}>
                      <Box
                        component="img"
                        src={val.cover}
                        alt={val.courseName}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Box
                        component="img"
                        src={val.hoverCover}
                        alt={val.courseName}
                        className='imgHover'
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0,
                          transition: 'opacity 0.5s',
                        }}
                      />
                    </Box>
                    <Typography variant='h6' sx={{ fontWeight: 500, fontSize: '20px', mt: 2 }}>
                      {val.courseName}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        backgroundColor: '#f8f8f8',
                        padding: '5px 20px',
                        fontWeight: 500,
                        fontSize: '15px',
                        color: '#039ee3',
                        borderRadius: '5px',
                        mt: 1,
                      }}
                    >
                      {val.course}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default OnlineCourses;
