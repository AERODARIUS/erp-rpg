import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SideMenu from './components/navigation/SideMenu';
import {
  Dashboard, Login, Projects, Leaderboard, ClientFeedback,
} from './pages';
import { useMockData } from './hooks/data';
import { init } from './redux/actions';

const { Content, Footer } = Layout;

function App() {
  const data = useMockData();
  const dispatch = useDispatch();
  dispatch(init(data));
  const hasLoginCookie = document.cookie === 'mockupLogin';
  const [state, setState] = useState({ loggedIn: hasLoginCookie, routes: [] });

  const loginHandler = () => {
    document.cookie = 'mockupLogin';
    setState({ loggedIn: true });
  };

  const BaseTemplate = ({ children }) => (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>ERP-RPG ©2020 ALTIMETRIK CORP. </Footer>
      </Layout>
    </Layout>
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login onLogin={loginHandler} />
          </Route>
          <Route exact path="/">
            <BaseTemplate>
              <Dashboard loggedIn={state.loggedIn} />
            </BaseTemplate>
          </Route>
          <Route exact path="/feedback">
            <BaseTemplate>
              <ClientFeedback />
            </BaseTemplate>
          </Route>
          <Route exact path="/leaderboard">
            <BaseTemplate>
              <Leaderboard />
            </BaseTemplate>
          </Route>
          <Route exact path="/projects">
            <BaseTemplate>
              <Projects />
            </BaseTemplate>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
