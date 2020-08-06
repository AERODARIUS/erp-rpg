import React, { useState } from 'react';
import { Card } from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';
import './SwappableCard.scss';

const CardSide = ({ content, cardClick }) => (
  <div onClick={cardClick}>
    {content}
  </div>
);

const SwappableCard = ({
  title, className, editable, content,
}) => {
  const { back, front } = content;
  const [state, setState] = useState({
    showBack: false,
  });
  return (
    <Card
      title={title}
      extra={editable ? (
        <a href="/">
          <EditOutlined />
        </a>
      ) : null}
      className={`swappable-card ${className}`}
    >
      <CardSide
        content={state.showBack && !!back ? back : front}
        cardClick={() => {
          setState(({ showBack }) => ({ showBack: !showBack }));
        }}
      />
    </Card>
  );
};

export default SwappableCard;
