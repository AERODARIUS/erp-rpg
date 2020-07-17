import React, { useState, useEffect } from 'react';
import mocker from 'mocker-data-generator';
import { AvatarGenerator } from 'random-avatar-generator';
import { PageHeader } from 'antd';
import GenericTable from '../components/util/GenericTable';

const generator = new AvatarGenerator();

const skillvalues = [
  'React', 'Angular', 'Vue', 'Salesforce', 'Apex', 'Java', 'SQL',
  'Dart', 'Swift', 'Node', 'Flexibility', 'Leadership', 'Scrum',
  'Proactivity', 'Teamwork', 'Commitment',
];

const skill = {
  name: {
    values: skillvalues,
    unique: true,
  },
};

const user = {
  key: {
    chance: 'integer',
    unique: true,
  },
  avatar: {
    function() {
      return (
        generator.generateRandomAvatar()
      );
    },
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
    min: 0,
    max: 5,
    get: 'name',
  },
};

// TODO: change nickname column with country, it could be more sueful
const Leaderboard = () => {
  const [state, setState] = useState({
    users: [],
  });

  useEffect(() => {
    mocker()
      .schema('skills', skill, skillvalues.length)
      .schema('user', user, 2500)
      .build()
      .then(
        (data) => {
          setState(() => {
            const users = data.user;
            users.push({
              key: '1',
              name: 'Zhou Maomao',
              nickname: 'Johninator',
              email: 'zmaomao@altimetrik.com',
              companyYears: 5,
              job: 'Vue.js Specialist',
              skills: ['Vue.js', 'CSS3', 'HTML5', 'Github', 'Teamwork', 'Communication'],
            });
            return { users };
          });
        },
        (err) => console.error(err),
      );
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Leaderboard"
        subTitle="~2.5K active talents in the system"
      />
      <GenericTable
        columns={[
          {
            title: '',
            key: 'avatar',
            type: 'avatar',
          },
          {
            title: 'Nickname',
            key: 'nickname',
            type: 'link',
          },
          {
            title: 'Name',
            key: 'name',
            type: 'text',
          },
          {
            title: 'Email',
            key: 'email',
            type: 'text',
          },
          {
            title: 'Job',
            key: 'job',
            type: 'text',
          },
          {
            title: 'Years in the company',
            key: 'companyYears',
            type: 'number',
            otherProps: {
              align: 'center',
            },
          },
          {
            title: 'Skills',
            key: 'skills',
            type: 'tags',
            tags: skillvalues,
          },
        ]}
        rows={state.users}
      />
    </>
  );
};

export default Leaderboard;
