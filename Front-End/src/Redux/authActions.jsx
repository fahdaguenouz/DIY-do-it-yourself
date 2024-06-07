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
      dispatch(getTutorials())
      dispatch(getCategory());
      dispatch(getSignal())
      dispatch(getLike())
      dispatch(getComment())

     // Fetch all users if the logged in user is an admin
    }
    if (user.role_id === 3) { 
      // Assuming role is accessible directly and is named as such
      toast.success('Welcome Again ' + user.prenom,{
        style: {
          fontSize: '18px',
          padding: '16px 24px',
          borderRadius: '8px',
        }
      });
        dispatch(getTutorials())
        dispatch(getCategory());
      dispatch(getLike())
      dispatch(getComment())
      dispatch(getSignal())
      dispatch(getUsers());





        // dispatch(getRoles());
     // Fetch all users if the logged in user is an admin
    }
    if (user.role_id === 2) { 
      // Assuming role is accessible directly and is named as such
      toast.success('Welcome Again ' + user.prenom,{
        style: {
          fontSize: '18px',
          padding: '16px 24px',
          borderRadius: '8px',
        }
      });
        dispatch(getTutorials())
        dispatch(getCategory());
        dispatch(getLike())
        dispatch(getComment())
        dispatch(getSignal())
      dispatch(getUsers());

        // dispatch(getRoles());
     // Fetch all users if the logged in user is an admin
    }
    if (user.role_id === 4) { 
      // Assuming role is accessible directly and is named as such
      toast.success('Welcome Again ' + user.prenom,{
        style: {
          fontSize: '18px',
          padding: '16px 24px',
          borderRadius: '8px',
        }
      });
        dispatch(getTutorials())
        dispatch(getCategory());
        dispatch(getLike())
        dispatch(getComment())
        dispatch(getSignal())
      dispatch(getUsers());
        // dispatch(getRoles());
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
    console.log('Logout successful');
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
  export const getTutorials = () => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.getTutorials(); // Ensure UserApi.getUsers() is correctly implemented
      dispatch({
        type: 'SET_TUTORIALS',
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching TUTORIALS :", error);
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
  

  export const getCategory = () => async dispatch => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.getCategory(); // Ensure UserApi.getUsers() is correctly implemented
      dispatch({
        type: 'SET_CATEGORY',
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching CATEGORY:", error);
      // You might want to handle errors, for example, showing an error message
      dispatch({ type: 'FETCH_CATEGORY_FAILURE', error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };


  export const AddTutorial = (TutoData,onSuccess) => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.addTutorial(TutoData);
      // dispatch({
      //   type: 'ADD_USERE',
      //   payload: response.data
      // });
      toast.success('Tutorial added successfully!');
      if (onSuccess) {
          onSuccess(); 
          
            // dispatch(getUsers());
           // Reset form on success
      }
      
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error fetching ADDING Tutorials :", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }


  export const AddCategory = (CategoryData,onSuccess) => async dispatch  => { 
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await UserApi.addCategory(CategoryData);
      // dispatch({
      //   type: 'ADD_USERE',
      //   payload: response.data
      // });
      toast.success('Category added successfully!');
      if (onSuccess) {
          onSuccess(); 
          
            // dispatch(getUsers());
           // Reset form on success
      }
      
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error fetching ADDING CATEGORY :", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  export const updateTutorial = (TutoId, TutoData, onSuccess) => async dispatch => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
        const response = await UserApi.updateTutorial(TutoId, TutoData);
        toast.success('Tutorial updated successfully!');
        if (onSuccess) {
            onSuccess();
            dispatch(getTutorials()); // Fetch updated list of tutorials
        }
    } catch (error) {
        toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
        console.error("Error updating tutorial:", error);
    } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
    }
};



export const UpdateCategory = (CategId, data, onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.update_Category(CategId, data);
    toast.success('Category updated successfully!');
    if (onSuccess) {
      onSuccess();
      dispatch(getCategory());
    }
  } catch (error) {
    toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    console.error("Error updating category:", error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const UpdateCategoryPicture = (CategId, formData, onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.update_CategoryPicture(CategId, formData);
    toast.success('Category picture updated successfully!');
    if (onSuccess) {
      onSuccess();
      dispatch(getCategory());
    }
  } catch (error) {
    toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    console.error("Error updating category picture:", error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const UpdateSubCategory = (SubCategId, SubCategData, onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
      const response = await UserApi.update_SubCategory(SubCategId, SubCategData);
      toast.success('SubCategory updated successfully!');
      if (onSuccess) {
          onSuccess();
          dispatch(getCategory());
           // Fetch updated list of tutorials
           // Fetch updated list of tutorials
      }
  } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error updating SubCategory:", error);
  } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const AddSubCategory = (SubCategoryData,onSuccess) => async dispatch  => { 
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.addSubCategory(SubCategoryData);
    // dispatch({
    //   type: 'ADD_USERE',
    //   payload: response.data
    // });
    toast.success('SubCategory added successfully!');
    if (onSuccess) {
        onSuccess(); 
        
         dispatch(getCategory());
         // Reset form on success
    }
    
  } catch (error) {
    toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    console.error("Error fetching ADDING SUBCATEGORY :", error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
}

export const AddSignal = (signalData,onSuccess) => async dispatch  => { 
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.addSignals(signalData);
    // dispatch({
    //   type: 'ADD_USERE',
    //   payload: response.data
    // });
    toast.success('Signal send successfully!');
    if (onSuccess) {
        onSuccess(); 
        
         
         dispatch(getSignal());

         // Reset form on success
    }
    
  } catch (error) {
    toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    console.error("Error fetching sending Signal :", error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
}

export const getSignal = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.getSignals(); // Ensure UserApi.getUsers() is correctly implemented
    dispatch({
      type: 'SET_SIGNALS',
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching SIGNALS:", error);
    // You might want to handle errors, for example, showing an error message
    dispatch({ type: 'FETCH_SIGNALS_FAILURE', error });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};
export const confirmSignal = (signalId, onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
      const response = await UserApi.confirmSignal(signalId);
      toast.success(response.data.message);
      if (onSuccess) {
          onSuccess();
          dispatch(getSignal()); // Refresh the signals
      }
  } catch (error) {
      toast.error('Error confirming signal.');
      console.error('Error confirming signal:', error);
  } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const likeTutorial = (tutoID,userID,onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.likeTutorials(tutoID,userID); // Ensure UserApi.getUsers() is correctly implemented
    toast.success('Like send successfully!');
    if (onSuccess) {
        onSuccess(); 
        
         dispatch(getTutorials());
         dispatch(getLike());

         // Reset form on success
    }
  } catch (error) {
    console.error("Error fetching LIKES:", error);
    // You might want to handle errors, for example, showing an error message
    dispatch({ type: 'FETCH_LIKES_FAILURE', error });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const getLike = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.getLikes(); // Ensure UserApi.getUsers() is correctly implemented
    dispatch({
      type: 'SET_LIKES',
      payload: response.data
    });
    dispatch({
      type: 'SET_HAS_LIKED',
      payload: response.data.hasLiked
    });
  } catch (error) {
    console.error("Error fetching LIKES:", error);
    // You might want to handle errors, for example, showing an error message
    dispatch({ type: 'FETCH_LIKES_FAILURE', error });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const CommentTutorial = (tutoID, userId, description,onSuccess) => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.commenter(tutoID,{ userId, description }); // Ensure UserApi.getUsers() is correctly implemented
    toast.success('Comment send successfully!');
    if (onSuccess) {
        onSuccess(); 
        
         dispatch(getTutorials());
         dispatch(getComment());

         // Reset form on success
    }
  } catch (error) {
    console.error("Error fetching Comments:", error);
    // You might want to handle errors, for example, showing an error message
    dispatch({ type: 'FETCH_Comment_FAILURE', error });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const getComment = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await UserApi.getComments(); // Ensure UserApi.getUsers() is correctly implemented
    dispatch({
      type: 'SET_COMMENTS',
      payload: response.data.comments
    });
  } catch (error) {
    console.error("Error fetching Comments:", error);
    // You might want to handle errors, for example, showing an error message
    dispatch({ type: 'FETCH__FAILURE', error });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};