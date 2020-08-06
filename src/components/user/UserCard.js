import React from 'react';
import {
  Tag,
  Descriptions,
} from 'antd';
import { SwappableCard } from '../util';
import './UserCard.scss';

const UserPhoto = () => (
  <div className="animate__animated animate__fadeIn">
    <div className="user-card-title">
      <Tag color="#00c180">Vue.js Specialist</Tag>
    </div>
    <img
      src="profile_photo.jpg"
      alt="Profile"
      className="profile-photo"
    />
  </div>
);

const UserInfo = () => (
  <Descriptions
    column={1}
    layout="horizontal"
    bordered
    className="animate__animated animate__fadeIn"
  >
    <Descriptions.Item label="Nickname">Johninator</Descriptions.Item>
    <Descriptions.Item label="Full Name">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Job">Vue.js Specialist</Descriptions.Item>
    <Descriptions.Item label="Short Bio">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Email">john@testemail.com</Descriptions.Item>
    <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

const UserCard = () => (
  <SwappableCard
    title="Johninator"
    editable
    content={{
      front: <UserPhoto />,
      back: <UserInfo />,
    }}
    className="user-card"
  />
);

export default UserCard;
