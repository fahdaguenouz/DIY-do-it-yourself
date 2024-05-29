import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, CircularProgress
} from "@mui/material";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddSubCategory, UpdateSubCategory, getCategory } from "@/Redux/authActions";
import toast from "react-hot-toast";

const GestAdminSubCategory = () => {
  const { id } = useParams();
  const { categories, baseUrl, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const category = categories.find(cat => cat.id === parseInt(id));

  const handleAjouter = () => {
    setIsEdit(false);
    setSelectedSubCategory(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSubCategoryName("");
    setDescription("");
    setPicture(null);
    setPreview(null);
  };

  const handleSave = async () => {
    if (isEdit && !hasChanges()) {
      toast.error("At least one field must be updated.");
      return;
    }
  
    const formData = new FormData();
    formData.append('name', subCategoryName);
    formData.append('description', description);
    formData.append('categorie_id', id);
    if (picture) {
      formData.append('SubCategory_picture', picture);
    }
    console.log('Form Data:', Object.fromEntries(formData.entries()));
    try {
      if (isEdit) {
        await dispatch(UpdateSubCategory(selectedSubCategory.id, formData));
      } else {
        await dispatch(AddSubCategory(formData));
      }
      setOpen(false);
      resetForm();
      dispatch(getCategory());
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating SubCategory");
    }
  };
  const hasChanges = () => {
    if (selectedSubCategory) {
      return (
        subCategoryName !== selectedSubCategory.name ||
        description !== selectedSubCategory.description ||
        picture !== null
      );
    }
    return subCategoryName || description || picture;
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setPicture(null);
      setPreview(null);
    }
  };

  const handleEditClick = (sub) => {
    setIsEdit(true);
    setSelectedSubCategory(sub);
    setSubCategoryName(sub.name);
    setDescription(sub.description);
    setPicture(null);
    setPreview(sub.SubCategory_picture);
    setOpen(true);
  };

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
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 4 }} >
        {category.description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleAjouter}>
          Add Subcategory
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subcategory Name"
            fullWidth
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              hidden
            />
          </Button>
          {preview && (
            <img src={`${baseUrl}storage/${preview}`} alt="Preview" style={{ maxWidth: "100px", marginTop: "10px" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GestAdminSubCategory;
