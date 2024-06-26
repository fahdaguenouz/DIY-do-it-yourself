import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
  CircularProgress,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddUser, getLevels, getRoles, getUsers } from '@/Redux/authActions';
import { Toaster } from 'react-hot-toast';

const AjouterUser = ({ onClose }) => {
  const { levels, roles, authenticated, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    phone: '',
    password: '',
    role_id: '',
    level_id: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicturePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithPicture = new FormData();
    Object.keys(formData).forEach(key => {
      formDataWithPicture.append(key, formData[key]);
    });


    if (profilePicture) {
      formDataWithPicture.append('profile_picture', profilePicture);
    }

    dispatch(AddUser(formDataWithPicture, () => {
        setFormData(initialFormData); // Reset the form only after successful addition
        if (onClose) onClose();
    }));
};
console.log(roles)
  const handleBack = () => {
    navigate('/admin/gestion-users');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Clear form data
    if (onClose) onClose(); // If there is a close function, call it
  };

  return (
    <Container maxWidth="lg">
      <Toaster position="top-center" reverseOrder={false} />
      <Grid container justifyContent="left">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Retour
        </Button>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '60vh' }}
      >
        <Grid item xs={12} style={{ width: '100%' }}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Add New User
            </Typography>
            {(!levels || !roles) ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '60vh' }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required variant="outlined">
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role_id"
                        value={formData.role_id}
                        onChange={handleChange}
                      >
                        {roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Level</InputLabel>
                      <Select
                        name="level_id"
                        value={formData.level_id}
                        onChange={handleChange}
                      >
                        {levels.map((level) => (
                          <MenuItem key={level.id} value={level.id}>
                            {level.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <input
                        accept="image/*"
                        type="file"
                        name="profile_picture"
                        onChange={handleProfilePictureChange}
                        
                        style={{ display: 'none' }}
                        id="profile-picture-input"
                      />
                      <label htmlFor="profile-picture-input">
                        <Button variant="contained" component="span">
                          Upload Profile Picture
                        </Button>
                      </label>
                      {profilePicturePreview && (
                        <Box mt={2}>
                          <img src={profilePicturePreview} alt="Profile Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AjouterUser;
