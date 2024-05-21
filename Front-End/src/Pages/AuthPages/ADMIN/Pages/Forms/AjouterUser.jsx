import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLevels, getRoles } from '@/Redux/authActions';

const AjouterUser = ({ onClose }) => {
  const { levels, roles, authenticated, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    phone: '',
    password: '',
    role_id: '',
    level_id: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getRoles());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    if (onClose) onClose();
  };

  const handleBack = () => {
    navigate('/admin/gestion-users');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg">
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
          {(!levels.length || !roles.length) ? (
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
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
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
                <Grid item xs={12}>
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
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
                    onClick={onClose}
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
