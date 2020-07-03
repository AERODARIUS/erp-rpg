import React from 'react';
import { Steps, Popover } from 'antd';
import SwappableCard from '../util/SwappableCard';
import './Career.scss';

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
  <Popover
    content={(
      <span>
        step
        {' '}
        {index}
        {' '}
        status:
        {' '}
        {status}
      </span>
    )}
  >
    {dot}
  </Popover>
);

const JobPositions = () => (
  <Steps
    current={2}
    progressDot={customDot}
    direction="vertical"
    className="animate__animated animate__flipInY"
  >
    <Step title="Software Developer" description="25/05/2015" />
    <Step title="Frontend Developer" description="18/11/2016" />
    <Step title="Vue.js Specialist" description="27/07/2019" />
    <Step title="Senior Frontend Developer" description="2-3 years" />
    <Step title="Frontend Team Leader" description="2 years" />
    <Step title="Frontend Manager" description="2-3 years" />
  </Steps>
);

const Projects = () => (
  <Steps
    current={4}
    progressDot={customDot}
    direction="vertical"
    className="animate__animated animate__flipInY"
  >
    <Step title="Acme Corporation" description="15/06/2015 - 23/11/2015" />
    <Step title="Globex Corporation" description="27/11/2016 - 28/07/2016" />
    <Step title="Initech" description="29/07/2016 - 24/02/2017" />
    <Step title="Umbrella Corporation" description="14/03/2017 - 12/01/2019 " />
    <Step title="SalesWeak" description="27/02/2019 - Present" />
  </Steps>
);

const Career = () => (
  <SwappableCard
    title="Career"
    editable
    content={{
      front: <JobPositions />,
      back: <Projects />,
    }}
    className="path"
  />
);

export default Career;
