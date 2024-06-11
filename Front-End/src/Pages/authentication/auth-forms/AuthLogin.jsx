import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '@/Pages/AuthPages/ADMIN/AnimateButton';
import FirebaseSocial from './FirebaseSocial';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/authActions'; // Import your login action

function AuthLogin() {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authenticated } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    if (authenticated && user) {
      const rolePath = getRolePath(user.role_id);
      navigate(rolePath);
    }
  }, [authenticated, user, navigate]);
  useEffect(() => {
    // Check for saved email and password in localStorage when the component mounts
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setChecked(true);
    }
  }, []);
  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      console.log("Attempting login with email: '" + values.email + "' and password: '" + values.password + "'");
      const resultAction = await dispatch(login(values.email, values.password));

      console.log("Login action result: ", resultAction);

      if (resultAction.type === 'LOGIN_SUCCESS') {
        console.log("Authenticated status: ", authenticated);

        if (checked) {
          console.log("Saving credentials to localStorage");
          localStorage.setItem('email', values.email);
          localStorage.setItem('password', values.password);
        } else {
          console.log("Removing credentials from localStorage");
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        const rolePath = getRolePath(user.role_id);
        navigate(rolePath);
      } else {
        setErrors({ submit: 'Failed to log in. Please try again.' });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrors({ submit: 'Non autorisé. Vérifiez vos identifiants "Email ou Password"' });
            break;
          case 400:
            setErrors({ submit: 'Adresse email ou mot de passe manquant' });
            break;
          case 500:
            setErrors({ submit: 'Un problème est survenu sur le serveur. Veuillez réessayer plus tard.' });
            break;
          default:
            setErrors({ submit: 'Échec de la connexion. Veuillez réessayer' });
        }
      } else if (!error.response) {
        setErrors({ submit: 'Aucune réponse du serveur' });
      } else {
        setErrors({ submit: 'Échec de la connexion. Veuillez réessayer' });
      }
      setSubmitting(false);
    }
  };

  const getRolePath = (roleId) => {
    switch (roleId) {
      case 1:
        return '/admin';
      case 2:
        return '/moderator';
      case 3:
        return '/creator';
      case 4:
        return '/standard';
      default:
        return '/';
    }
  };

  return (
    <Formik
      initialValues={{
        email: window.localStorage.getItem('email') || '',
        password: window.localStorage.getItem('password') || '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
                <Link variant="h6" component={RouterLink} color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                {/* <Typography variant="caption"> Login with</Typography> */}
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <FirebaseSocial />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

export default AuthLogin;