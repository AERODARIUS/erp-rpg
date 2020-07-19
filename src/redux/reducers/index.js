import { combineReducers } from 'redux';
import users from './users';
import projects from './projects';

export default combineReducers({ users, projects });
