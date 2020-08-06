import React from 'react';
import { PageHeader } from 'antd';
import { useSelector } from 'react-redux';

import { technologiesList } from '../hooks/data';
import { getProjects, getUsers } from '../redux/selectors';
import { GenericTable } from '../components/util';

const Projects = () => {
  const users = useSelector(getUsers);
  const projects = useSelector(getProjects);
  const usersList = users.map(({ name }) => name);
  const currencyrender = (render) => (
    (props) => {
      const amount = render(props);
      const formattedAmount = new Intl.NumberFormat().format(amount);
      return `$${formattedAmount}`;
    }
  );

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
            title: 'Budget',
            key: 'budget',
            type: 'number',
            customRender: currencyrender,
          },
          {
            title: 'Revenue',
            key: 'revenue',
            type: 'number',
            customRender: currencyrender,
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
        previewInfo={
          {
            title: 'name',
            details: [
              {
                title: 'Name',
                key: 'name',
                type: 'text',
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
                title: 'Released',
                key: 'started',
                type: 'date',
              },
              {
                title: 'Deadline',
                key: 'finished',
                type: 'date',
              },
            ],
          }
        }
        rows={projects}
      />
    </>
  );
};

export default Projects;
