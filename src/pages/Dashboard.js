import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import {
  UserCard, Skills, Stats, Career,
} from '../components/user';
import './Dashboard.scss';

const Dashboard = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashboard">
      <Row gutter={[16, 16]} className="dashboard-top">
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
    </div>
  );
};

export default Dashboard;
