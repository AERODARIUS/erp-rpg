import React, { useState, useEffect } from 'react';
import mocker from 'mocker-data-generator';
import { AvatarGenerator } from 'random-avatar-generator';
import {
  PageHeader, Table, Tag, Avatar,
} from 'antd';

const { Column } = Table;

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

const compareString = (a, b) => {
  if (a.name === b.name) {
    return 0;
  }
  if (a.name > b.name) {
    return 1;
  }

  return -1;
};

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
      <Table
        dataSource={state.users}
        className="animate__animated animate__zoomIn"
        pagination={{ position: ['bottomRight', 'topRight'] }}
      >
        <Column
          title=""
          dataIndex="avatar"
          key="avatar"
          render={(url) => (
            <Avatar src={url} />)}
        />
        <Column
          title="Nickname"
          dataIndex="nickname"
          key="nickname"
          render={(text) => (
            <a href="/">{text}</a>
          )}
          sorter={{
            compare: compareString,
            multiple: 1,
          }}
          sortDirections={['descend', 'ascend']}
        />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={{
            compare: compareString,
            multiple: 2,
          }}
          sortDirections={['descend', 'ascend']}
        />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          sorter={{
            compare: compareString,
            multiple: 3,
          }}
          sortDirections={['descend', 'ascend']}
        />
        <Column
          title="Job"
          dataIndex="job"
          key="job"
          sorter={{
            compare: compareString,
            multiple: 4,
          }}
          sortDirections={['descend', 'ascend']}
        />
        <Column
          title="Years in the company"
          dataIndex="companyYears"
          key="companyYears"
          align="center"
          sorter={{
            compare: (a, b) => a.companyYears - b.companyYears,
            multiple: 5,
          }}
          sortDirections={['descend', 'ascend']}
        />
        <Column
          title="Skills"
          dataIndex="skills"
          key="skills"
          render={(skills) => {
            if (!skills) {
              return null;
            }

            const skillsSet = new Set();

            return (
              <>
                {skills.map((skill) => {
                  if (skillsSet.has(skill)) {
                    return null;
                  }

                  skillsSet.add(skill);

                  return (
                    <Tag color="blue" key={skill}>
                      {skill}
                    </Tag>
                  );
                })}
              </>
            );
          }}
          sorter={{
            compare: (a, b) => a.skills.length - b.skills.length,
            multiple: 5,
          }}
          sortDirections={['descend', 'ascend']}
        />
      </Table>
    </>
  );
};

export default Leaderboard;
