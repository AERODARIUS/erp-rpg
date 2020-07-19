import { INIT, ADD_USER, ADD_PROJECT } from './actionTypes';

export const init = (data) => ({
  type: INIT,
  payload: data,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: { user },
});

export const addProject = (projcet) => ({
  type: ADD_PROJECT,
  payload: { projcet },
});
