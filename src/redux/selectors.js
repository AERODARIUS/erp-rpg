export const getUsers = ({ users }) => {
  const { nicknames, byNickname } = users;

  return nicknames.map((nickname) => byNickname[nickname]);
};

export const getUserByNickname = ({ users }, nickname) => (users.byNickname[nickname]);

export const getProjects = ({ projects }) => {
  const { names, byName } = projects;

  return names.map((name) => byName[name]);
};

export const getProjectByName = ({ projects }, name) => (projects.byName[name]);
