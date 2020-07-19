import { useState, useEffect } from 'react';
import mocker from 'mocker-data-generator';

export const technologiesList = [
  'React', 'Angular', 'Vue', 'Salesforce', 'Apex', 'Java', 'SQL',
  'Dart', 'Swift', 'Node.js', 'Docker', 'Flutter', 'Apex',
  'Mongo DB', 'Lightning', 'GraphQL', 'Kafka', 'Kubernetes',
];

const technology = {
  name: {
    values: technologiesList,
    unique: true,
  },
};

export const skillsList = [
  'React', 'Angular', 'Vue', 'Salesforce', 'Apex', 'Java', 'SQL',
  'Dart', 'Swift', 'Node', 'Flexibility', 'Leadership', 'Scrum',
  'Proactivity', 'Teamwork', 'Commitment',
];

const skill = {
  name: {
    values: skillsList,
    unique: true,
  },
};

const user = {
  key: {
    chance: 'integer',
    unique: true,
  },
  avatar: {
    faker: 'internet.avatar',
  },
  name: {
    faker: 'name.findName',
  },
  nickname: {
    faker: 'internet.userName',
    unique: true,
  },
  email: {
    unique: true,
    faker: 'internet.email',
  },
  companyYears: {
    faker: 'random.number({"min": 0, "max": 15})',
  },
  job: {
    values: [
      'Software Develope',
      'Frontend Developer',
      'Vue.js Specialist',
      'React Specialist',
      'Angular Specialist',
      'Ember Specialist',
      'Senior Frontend Developer',
      'Frontend Team Leader',
      'Frontend Technical Leader',
      'Frontend Manager',
      'QA Junior',
      'QA Analyst',
      'QA Senior',
      'QA Lead',
      'QA Coach',
      'QA Manager',
      'SFDC Developer',
      'Ligthning Specialist',
      'Apex Specialist',
      'SFDC Platform Specialist',
      'SFDC Team Lead',
      'SFDC Manager',
      'SFDC Delivery Manager',
      'SFDC Technical Architect Lead',
      'SFDC Certified Technical Architect',
      'SFDC Chief Architect',
    ],
  },
  skills: {
    hasMany: 'skills',
    min: 1,
    max: 5,
    get: 'name',
  },
};

const project = {
  key: {
    chance: 'integer',
    unique: true,
  },
  name: {
    faker: 'commerce.productName',
    unique: true,
  },
  customer: {
    faker: 'company.companyName',
  },
  location: {
    faker: 'address.country',
  },
  started: {
    faker: 'date.between("2013-01-01", "2016-01-01")',
  },
  finished: {
    faker: 'date.between("2017-01-01", "2020-01-01")',
  },
  team: {
    hasMany: 'users',
    min: 1,
    max: 10,
    get: 'name',
  },
  technologies: {
    hasMany: 'technologies',
    min: 2,
    max: 8,
    get: 'name',
  },
};

export function useMockData() {
  const [state, setState] = useState({
    skills: [],
    users: [],
    technologies: [],
    projects: [],
  });

  useEffect(() => {
    mocker()
      .schema('skills', skill, skillsList.length)
      .schema('users', user, 2500)
      .schema('technologies', technology, technologiesList.length)
      .schema('projects', project, 328)
      .build()
      .then(
        (data) => {
          setState(() => {
            const {
              skills, users, technologies, projects,
            } = data;
            users.push({
              key: '1',
              name: 'Zhou Maomao',
              nickname: 'Johninator',
              email: 'zmaomao@altimetrik.com',
              companyYears: 5,
              job: 'Vue.js Specialist',
              skills: ['Vue.js', 'CSS3', 'HTML5', 'Github', 'Teamwork', 'Communication'],
            });
            return {
              skills, users, technologies, projects,
            };
          });
        },
        (err) => console.error(err),
      );
  }, []);

  return state;
}
