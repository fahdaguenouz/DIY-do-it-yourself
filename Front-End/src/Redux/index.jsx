import { combineReducers } from 'redux';
import authReducer from './authReducer'; // You'll create this reducer

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
