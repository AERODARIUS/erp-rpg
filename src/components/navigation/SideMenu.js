import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileSearchOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './SideMenu.scss';

const { Sider } = Layout;

function SideMenu() {
  const [state, setState] = useState({
    collapsed: true,
  });

  const history = useHistory();

  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="menu-sider">
      <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className={`menu-sider-logo${state.collapsed ? '-colapsed' : ''}`}>
          <img src="/logo64.png" alt="ERP-RPG" />
          {!state.collapsed && <h1>ERP-RPG</h1>}
        </div>
        <Menu
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={state.collapsed}
        >
          <Menu.Item
            key="/"
            icon={<UserOutlined />}
            onClick={() => history.push('/')}
          >
            Me
          </Menu.Item>
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
