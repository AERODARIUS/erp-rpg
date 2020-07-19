import { INIT, ADD_USER } from '../actionTypes';

const initialState = {
  nicknames: [],
  byNickname: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload;

      return {
        ...state,
        nicknames: [...state.nicknames, user.nickname],
        byNickname: {
          ...state.byNickname,
          [user.nickname]: user,
        },
      };
    }
    case INIT: {
      const { users } = action.payload;

      return (users || []).reduce(({ nicknames, byNickname }, user) => {
        const { nickname } = user;

        return {
          nicknames: [...nicknames, nickname],
          byNickname: {
            ...byNickname,
            [nickname]: user,
          },
        };
      },
      {
        nicknames: [],
        byNickname: {},
      });
    }
    default:
      return state;
  }
}
