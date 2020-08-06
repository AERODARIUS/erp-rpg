import React from 'react';
import { PageHeader } from 'antd';
import { useSelector } from 'react-redux';

import { skillsList } from '../hooks/data';
import { GenericTable } from '../components/util';
import { getUsers } from '../redux/selectors';

const Leaderboard = () => {
  const users = useSelector(getUsers);

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
            title: 'Name',
            key: 'name',
            type: 'link',
          },
          {
            title: 'Average Performance',
            key: 'performance',
            type: 'number',
            customRender: (render) => (
              (props) => `${render(props)}%`
            ),
          },
          {
            title: 'Salary',
            key: 'salary',
            type: 'currency',
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
            tags: skillsList,
          },
        ]}
        rows={users}
      />
    </>
  );
};

export default Leaderboard;
