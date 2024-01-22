import { combineReducers } from 'redux';
import taskReducer from './slices/taskSlice';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;