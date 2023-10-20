import { combineReducers } from 'redux';
import todo from './todo';
import todoToolkit from './todoToolkit';

const rootReducer = combineReducers({
  todo,
  todoToolkit
})

export default rootReducer;

