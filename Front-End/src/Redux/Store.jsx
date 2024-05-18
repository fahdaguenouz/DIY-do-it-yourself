import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // This middleware allows us to write action creators that return a function instead of an action
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
  });
  
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
export default store;
