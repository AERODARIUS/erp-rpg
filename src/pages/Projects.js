import React, { useState, useEffect } from 'react';
import mocker from 'mocker-data-generator';
import { AvatarGenerator } from 'random-avatar-generator';
import { PageHeader } from 'antd';
import GenericTable from '../components/util/GenericTable';

const technologiesList = [
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
    faker: 'date.between("2015-01-01", "2015-01-05")',
  },
  finished: {
    faker: 'date.future',
  },
  team: {
    hasMany: 'technology',
    min: 2,
    max: 5,
    get: 'name',
  },
  technologies: {
    hasMany: 'technology',
    min: 2,
    max: 5,
    get: 'name',
  },
};

const Projects = () => {
  const [state, setState] = useState({
    projects: [],
  });

  useEffect(() => {
    mocker()
      .schema('technology', technology, technologiesList.length)
      .schema('project', project, 328)
      .build()
      .then(
        (data) => {
          console.log(data.project);
          setState({ projects: data.project });
        },
        (err) => console.error(err),
      );
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Projects"
        subTitle="328 registered"
      />
      <GenericTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            type: 'link',
          },
          {
            title: 'Customer',
            key: 'customer',
            type: 'text',
          },
          {
            title: 'Location',
            key: 'location',
            type: 'text',
          },
          {
            title: 'Started',
            key: 'started',
            type: 'text',
          },
          {
            title: 'Finished',
            key: 'finished',
            type: 'text',
          },
          {
            title: 'Team',
            key: 'team',
            type: 'tags',
          },
          {
            title: 'Technologies',
            key: 'technologies',
            type: 'tags',
          },
        ]}
        rows={state.projects}
      />
    </>
  );
};

export default Projects;
