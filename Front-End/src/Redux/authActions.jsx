import { axiosClient } from '@/api/axios';
import UserApi from '../Service/api/UserApi';
import toast from 'react-hot-toast';

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

    if (user.role_id === 1) { 
      // Assuming role is accessible directly and is named as such
      toast.success('Welcome Again  '+user.prenom,{
        style: {
          fontSize: '18px',
          padding: '16px 24px',
          borderRadius: '8px',
        }
      });
      dispatch(getUsers());
        dispatch(getLevels())
        dispatch(getRoles());
     // Fetch all users if the logged in user is an admin
    }
    if (user.role_id === 3) { 
      // Assuming role is accessible directly and is named as such
      toast.success('Welcome Again'+user.prenom,{
        style: {
          fontSize: '18px',
          padding: '16px 24px',
          borderRadius: '8px',
        }
      });
      // dispatch(getUsers());
      //   dispatch(getLevels())
      //   dispatch(getRoles());
     // Fetch all users if the logged in user is an admin
    }

  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
export const register = (data) => async dispatch => {
  try {
    const response = await UserApi.register(data);
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('AUTHENTICATED', 'true');

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: { token, user }
    });
    toast.success('Registration successfully!');
  } catch (error) {
    console.error("Registration error", error);
    toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    throw error;  // Re-throw error to catch in component and handle appropriately
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


  export const AddUser = (UserData,onSuccess) => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.Add_User(UserData);
      // dispatch({
      //   type: 'ADD_USERE',
      //   payload: response.data
      // });
      toast.success('User added successfully!');
      if (onSuccess) {
          onSuccess(); 
          
            dispatch(getUsers());
           // Reset form on success
      }
      
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error fetching ADDING USERS :", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  export const updateUser = (userId, userData, onSuccess) => async dispatch => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.updateUser(userId, userData);
      toast.success('User updated successfully!');
      if (onSuccess) {
          onSuccess();
          dispatch(getUsers()); // Fetch updated list of users
      }
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error updating user:", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  