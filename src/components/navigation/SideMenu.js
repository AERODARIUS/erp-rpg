import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileSearchOutlined,
  TeamOutlined,
  LogoutOutlined,
  CommentOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import './SideMenu.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMenu() {
  const [state, setState] = useState({
    collapsed: true,
  });

  const history = useHistory();

  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };

  const location = useLocation();

  return (
    <div className="menu-sider">
      <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className={`menu-sider-logo${state.collapsed ? '-colapsed' : ''}`}>
          <img src={state.collapsed ? '/alti-logo.jfif' : '/alti-logo-expanded.png'} alt="ERP-RPG" />
        </div>
        <Menu
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={state.collapsed}
        >
          <SubMenu
            icon={<UserOutlined />}
            title="Me"
          >
            <Menu.Item
              key="/"
              icon={<ProfileOutlined />}
              onClick={() => history.push('/')}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              key="/feedback"
              icon={<CommentOutlined />}
              onClick={() => history.push('/feedback')}
            >
              Feedback
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="/leaderboard"
            icon={<FileSearchOutlined />}
            onClick={() => history.push('/leaderboard')}
          >
            Leaderboard
          </Menu.Item>
          <Menu.Item
            key="/projects"
            icon={<TeamOutlined />}
            onClick={() => history.push('/projects')}
          >
            Projects
          </Menu.Item>
          <Menu.Item
            key="/login"
            icon={<LogoutOutlined />}
            onClick={
              () => {
                document.cookie = null;
                history.push('/login');
              }
            }
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}

export default SideMenu;
