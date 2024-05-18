import UserApi from '../Service/api/UserApi';

export const login = (email, password) => async dispatch => {
  try {
    const response = await UserApi.login(email, password);
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('AUTHENTICATED', 'true');
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { token, user }
    });
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('AUTHENTICATED');
    dispatch({ type: 'LOGOUT' });
  };

  
  export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user
    };
  };