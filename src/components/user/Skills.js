import React from 'react';
import { Card, Tag } from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';

const Skill = ({ children }) => (
  <Tag color="blue" className="animate__animated animate__zoomIn">
    {children}
  </Tag>
);

const Skills = () => (
  <Card
    title="Skills"
    bordered={false}
    extra={<a href="/"><EditOutlined /></a>}
  >
    <Skill>Vue.js</Skill>
    <Skill>CSS3</Skill>
    <Skill>HTML5</Skill>
    <Skill>Github</Skill>
    <Skill>Teamwork</Skill>
    <Skill>Communication</Skill>
  </Card>
);

export default Skills;
