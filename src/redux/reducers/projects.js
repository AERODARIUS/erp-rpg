import { INIT, ADD_PROJECT } from '../actionTypes';

const initialState = {
  names: [],
  byName: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      const { project } = action.payload;
      return {
        ...state,
        names: [...state.names, project.name],
        byName: {
          ...state.byName,
          [project.name]: project,
        },
      };
    }
    case INIT: {
      const { projects } = action.payload;

      return (projects || []).reduce(({ names, byName }, project) => {
        const { name } = project;

        return {
          names: [...names, name],
          byName: {
            ...byName,
            [name]: project,
          },
        };
      },
      {
        names: [],
        byName: {},
      });
    }
    default:
      return state;
  }
}
