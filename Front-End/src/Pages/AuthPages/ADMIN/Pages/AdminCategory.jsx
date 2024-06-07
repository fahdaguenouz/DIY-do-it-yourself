import React, { useEffect, useState } from "react";
import {
  Box, Grid, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, UpdateCategory, getCategory, UpdateCategoryPicture } from "@/Redux/authActions";
import toast from "react-hot-toast";

const AdminCategory = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [originalValues, setOriginalValues] = useState({});
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const dispatch = useDispatch();
  const { loading, categories, baseUrl, tutorials } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleAjouter = () => {
    setIsEdit(false);
    setSelectedCategory(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCategoryName("");
    setDescription("");
    setPicture(null);
    setPreview(null);
    setOriginalValues({});
  };

  const hasChanges = () => {
    if (selectedCategory) {
      return (
        categoryName !== selectedCategory.name ||
        description !== selectedCategory.description ||
        picture !== null
      );
    }
    return categoryName || description || picture;
  };

  const handleSave = async () => {
    if (isEdit && !hasChanges()) {
      toast.error("At least one field must be updated.");
      return;
    }

    try {
      if (isEdit) {
        if (categoryName !== selectedCategory.name || description !== selectedCategory.description) {
          const data = { name: categoryName, description: description };
          await dispatch(UpdateCategory(selectedCategory.id, data));
        }
        if (picture) {
          const formData = new FormData();
          formData.append('Category_picture', picture);
          await dispatch(UpdateCategoryPicture(selectedCategory.id, formData));
        }
      } else {
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('description', description);
        if (picture) {
          formData.append('Category_picture', picture);
        }
        await dispatch(AddCategory(formData));
      }
      setOpen(false);
      resetForm();
      dispatch(getCategory());
    } catch (error) {
      toast.error(error.message);
    }
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

  const handleCategoryClick = (category) => {
    const tutorialsCount = tutorials.filter(tutorial => tutorial.Sub_Categorie_id === category.id).length;
    setCategoryDetails({ ...category, tutorialsCount });
    setDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
    setCategoryDetails(null);
  };

  const handleEditClick = (category) => {
    setIsEdit(true);
    setSelectedCategory(category);
    setCategoryName(category.name);
    setDescription(category.description);
    setPicture(null);
    setPreview(category.Category_picture);
    setOriginalValues({
      name: category.name,
      description: category.description,
      Category_picture: category.Category_picture
    });
    setOpen(true);
  };

  if (!categories) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleAjouter}>
          Ajouter
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }} color='primary'>
          Category Management
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Grid container spacing={3}>
            {categories.map((val) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={val.id}>
                <Box
                  onClick={() => handleCategoryClick(val)}
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
                      src={`${baseUrl}storage/${val.Category_picture}`} 
                      alt={val.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      component="img"
                      src={`${baseUrl}storage/${val.Category_picture}`} 
                      alt={val.name}
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
                    {val.name}
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
                    SubCategories: {val.subcategories.length}
                  </Typography>
                  <Button onClick={(e) => { e.stopPropagation(); handleEditClick(val); }} sx={{ mt: 1 }}>
                    Edit
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
            <img src={preview ? preview : `${baseUrl}storage/${preview}`} alt="Preview" style={{ maxWidth: "100px", marginTop: "10px" }} />
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

      {categoryDetails && (
        <Dialog open={detailDialogOpen} onClose={handleDetailDialogClose}>
          <DialogTitle>Category Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Name: {categoryDetails.name}</Typography>
            <Typography variant="body1">Description: {categoryDetails.description}</Typography>
            <Typography variant="body1">Number of Subcategories: {categoryDetails.subcategories.length}</Typography>
            <Typography variant="body1">Number of Tutorials: {categoryDetails.tutorialsCount}</Typography>
            <img src={`${baseUrl}storage/${categoryDetails.Category_picture}`} alt={categoryDetails.name} style={{ maxWidth: "100px", marginTop: "10px" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AdminCategory;
