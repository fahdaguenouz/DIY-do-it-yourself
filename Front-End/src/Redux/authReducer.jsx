const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    authenticated: localStorage.getItem('AUTHENTICATED') === 'true',
    loading: false,
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          authenticated: true
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          authenticated: true
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
          authenticated: false
        };
        case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
      case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
      default:
        return state;
    }
  }
  
  export default authReducer;
  