import React from 'react';
import { PageHeader } from 'antd';
import { useSelector } from 'react-redux';

import GenericTable from '../components/util/GenericTable';
import { technologiesList } from '../hooks/data';
import { getProjects, getUsers } from '../redux/selectors';

const Projects = () => {
  const users = useSelector(getUsers);
  const projects = useSelector(getProjects);
  const usersList = users.map(({ name }) => name);

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
            title: 'Team',
            key: 'team',
            type: 'tags',
            tags: usersList,
          },
          {
            title: 'Technologies',
            key: 'technologies',
            type: 'tags',
            tags: technologiesList,
          },
        ]}
        rows={projects}
      />
    </>
  );
};

export default Projects;
