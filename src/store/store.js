import { combineReducers } from 'redux';
import dataReducers from './reducers/dataReducers';

const rootReducer = combineReducers({
  data: dataReducers,
});

export default rootReducer;
