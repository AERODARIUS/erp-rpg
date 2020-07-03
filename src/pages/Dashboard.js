import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import UserCard from '../components/user/UserCard';
import Skills from '../components/user/Skills';
import Stats from '../components/user/Stats';
import Career from '../components/user/Career';
import './Dashboard.scss';

const Dashboard = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Row gutter={[16, 16]} className="dashboard">
      <Col flex="300px">
        <UserCard />
      </Col>
      <Col flex="300px">
        <Career />
      </Col>
      <Col flex="auto">
        <div className="skills-card">
          <Skills />
        </div>
        <Stats />
      </Col>
    </Row>
  );
};

export default Dashboard;
