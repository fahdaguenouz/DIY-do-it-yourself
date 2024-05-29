const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    authenticated: localStorage.getItem('AUTHENTICATED') === 'true',
    loading: false,
    users: [],
    levels: [],
    roles: [],
    baseUrl: 'http://localhost:8000/',
    categories:[],
    tutorials:[]
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_USERS':
        return {
          ...state,
          users: action.payload,
          error: null  // Clear any previous errors
        };
        case 'SET_CATEGORY':
        return {
          ...state,
          categories: action.payload,
          error: null  // Clear any previous errors
        };
      case 'FETCH_USERS_FAILURE':
        return {
          ...state,
          error: action.error  // Store the error
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          authenticated: true,
        };
        case 'REGISTER_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          authenticated: true,
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
      case 'SET_LEVELS':
        return {
          ...state,
          levels: action.payload,
          error: null  // Clear any previous errors
        };
        case 'SET_TUTORIALS':
        return {
          ...state,
          tutorials: action.payload,
          error: null  // Clear any previous errors
        };
        case 'SET_ROLES':
        return {
          ...state,
          roles: action.payload,
          error: null  // Clear any previous errors
        };
      default:
        return state;
    }
  }
  
  export default authReducer;
  