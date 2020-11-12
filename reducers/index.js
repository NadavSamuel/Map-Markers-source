import { combineReducers } from 'redux';
import userReducer from './userReducer'
import systemReducer from './systemReducer';
import { placeReducer } from './placeReducer';
import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
  system: systemReducer,
  placeReducer: placeReducer,
  notificationReducer:notificationReducer,
  user: userReducer
})

export default rootReducer;