import React from 'react';
import { Descriptions, Progress, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import SwappableCard from '../util/SwappableCard';
import './Stats.scss';

const { Item } = Descriptions;

const stats = [
  {
    label: 'Ethic',
    percent: 60,
  },
  {
    label: 'Commitment',
    percent: 80,
  },
  {
    label: 'Respect',
    percent: 80,
  },
  {
    label: 'Teamwork',
    percent: 100,
  },
  {
    label: 'Customer focus',
    percent: 80,
  },
  {
    label: 'Initiative and autonomy',
    percent: 80,
  },
  {
    label: 'Flexibility',
    percent: 40,
  },
  {
    label: 'Scrum',
    percent: 60,
  },
  {
    label: 'Platform knowledge',
    percent: 20,
  },
  {
    label: 'Programming language knowledge',
    percent: 80,
  },
  {
    label: 'Code quality',
    percent: 60,
  },
  {
    label: 'Use of development tools',
    percent: 100,
  },
  {
    label: 'Problem solving',
    percent: 80,
  },
  {
    label: 'On-time task completion',
    percent: 100,
  },
  {
    label: 'Actively take part in project tasks',
    percent: 40,
  },
];

const averageStats = Math.round(
  stats.reduce(
    (total, stat) => total + stat.percent, 0,
  ) / stats.length,
);

const SummaryData = () => (
  <Descriptions
    column={3}
    layout="vertical"
    colon={false}
    className="success-card__summary animate__animated animate__flipInX"
  >
    <Item label="Performance Average" span={3}>
      <Progress type="circle" percent={averageStats} />
    </Item>
    <Item span={1}>
      <Statistic
        title="Performance Delta"
        value={11.28}
        precision={2}
        valueStyle={{ color: '#3f8600' }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Item>
    <Item span={1}>
      <Statistic title="Projects" value={5} prefix={<TeamOutlined />} />
    </Item>
    <Item span={1}>
      <Statistic title="Success Rate" value={93.5} suffix="/ 100" />
    </Item>
  </Descriptions>
);

const DetailedData = () => (
  <Descriptions
    column={2}
    layout="vertical"
    colon={false}
    className="animate__animated animate__flipInX"
  >
    {
      stats.map((stat) => (
        <Item label={stat.label} key={stat.label}>
          <Progress percent={stat.percent} steps={5} />
        </Item>
      ))
    }
  </Descriptions>
);

const Stats = () => (
  <SwappableCard
    className="success-card"
    title="Stats"
    content={{
      front: <SummaryData />,
      back: <DetailedData />,
    }}
  />
);

export default Stats;
