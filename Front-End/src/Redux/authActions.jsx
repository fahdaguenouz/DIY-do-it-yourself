import { axiosClient } from '@/api/axios';
import UserApi from '../Service/api/UserApi';

export const login = (email, password) => async dispatch => {
  try {
    const response = await UserApi.login(email, password);
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('AUTHENTICATED', 'true');
    // localStorage.setItem('email', email);
    // localStorage.setItem('password', password);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { token, user }
    });
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

// export const fetchCSRFToken = async () => {
//   await axios.get('/sanctum/csrf-cookie', {
//       baseURL: import.meta.env.VITE_BACKEND_URL  // Ensure this is correct
//   });
// };
// export const logout = () => async dispatch => {
//   try {
//       await fetchCSRFToken();  // Fetch CSRF token if necessary
//       await axiosClient.post('/logout');  // Attempt to logout
//       // If logout is successful, then clean up local storage and update the state
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('AUTHENTICATED');
//       dispatch({ type: 'LOGOUT_SUCCESS' });  // Dispatch a success action
//   } catch (error) {
//       console.error("Logout error", error);
//       dispatch({ type: 'LOGOUT_FAILURE', error: error });  // Dispatch a failure action
//   }
// };
export const logout = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try{
    await axiosClient.post('/logout');
    console.log('Logout successful', response);
  }catch (error) {
    console.error("Logout error", error);
  }finally{

    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('AUTHENTICATED');
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'SET_LOADING', payload: false });
  }
  };

  export const getUsers = () => async dispatch => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.getUsers(); // Ensure UserApi.getUsers() is correctly implemented
      dispatch({
        type: 'SET_USERS',
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      // You might want to handle errors, for example, showing an error message
      dispatch({ type: 'FETCH_USERS_FAILURE', error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user
    };
  };

  export const getLevels = () => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.getLevels(); // Ensure UserApi.getUsers() is correctly implemented
      dispatch({
        type: 'SET_LEVELS',
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching Levels :", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  export const getRoles = () => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.getRoles(); // Ensure UserApi.getUsers() is correctly implemented
      dispatch({
        type: 'SET_ROLES',
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching ROLES :", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }