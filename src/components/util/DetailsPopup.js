import React from 'react';
import { Descriptions, Popover } from 'antd';

const parseType = (value, type) => {
  switch (type) {
    case 'date':
      return value.toDateString();

    default: // text
      return `${value}`;
  }
};

const Content = ({ details }) => (
  <Descriptions
    bordered
    column={3}
    size="small"
  >
    {details.map(({ label, data, dataType }) => (
      <Descriptions.Item label={label} key={label}>
        {parseType(data, dataType)}
      </Descriptions.Item>
    ))}
  </Descriptions>
);

const DetailsPopup = ({ title, details, children }) => (
  <Popover
    placement="right"
    content={<Content details={details} />}
    title={title}
  >
    {children}
  </Popover>
);

export default DetailsPopup;
