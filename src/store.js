import {createStore} from 'redux';
import reducers from './reducers/data.js';

export const store = createStore(reducers);