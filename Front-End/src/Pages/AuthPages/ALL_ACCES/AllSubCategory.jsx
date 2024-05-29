import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddSubCategory, UpdateSubCategory, getCategory } from "@/Redux/authActions";
import toast from "react-hot-toast";

const AllSubCategory = () => {
  const { id } = useParams();
  const { categories, baseUrl, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

const navigate =useNavigate()
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const category = categories.find(cat => cat.id === parseInt(id));

const handleReturn=()=>{
    navigate('/all/category')

}


 

 

  if (!category){
    return(
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }} color='primary'>
        Subcategories of {category.name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleReturn}>
          return
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Grid container spacing={3}>
          {category.subcategories.length === 0 ? (
            <Typography variant="h5" component="h2" sx={{ mt: 4, mx: 'auto' }}>
              {category.name} has no subcategory
            </Typography>
          ) : (
            category.subcategories.map(sub => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={sub.id}>
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
                      src={`${baseUrl}storage/${sub.SubCategory_picture}`}
                      alt={sub.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      component="img"
                      src={`${baseUrl}storage/${sub.SubCategory_picture}`}
                      alt={sub.name}
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
                    {sub.name}
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
                    {sub.description}
                  </Typography>
                  <Button onClick={(e) => { e.stopPropagation(); handleEditClick(sub); }} sx={{ mt: 1 }}>
                    Edit
                  </Button>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      
    </Box>
  );
};

export default AllSubCategory;
