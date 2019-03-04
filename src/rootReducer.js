import { combineReducers } from 'redux';

import ToursReducer from './tour/reducer';
import MessageReducer from './page/reducer';
import AdminReducers from './admin/store/reducer';

export default combineReducers({
    ToursReducer,
    MessageReducer,
    AdminReducers
});