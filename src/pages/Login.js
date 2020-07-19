import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Checkbox, Card, Spin,
} from 'antd';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [state, setState] = useState({ spinning: false });

  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);

    setTimeout(() => {
      onLogin();
      history.push('/');
    }, 500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setState({ spinning: false });
  };

  useEffect(() => {
    if (state.submitCallback) {
      state.submitCallback();
    }
  }, [state.submitCallback]);

  return (
    <Spin size="large" spinning={state.spinning}>
      <div className="login-wrapper">
        <Card
          title="Login"
          bordered={false}
          className="login-form"
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div>Username</div>
            <Form.Item name="username">
              <Input defaultValue="Johninator" />
            </Form.Item>

            <div>Password</div>
            <Form.Item name="password">
              <Input.Password defaultValue="123456" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="remember-forgot">
              <Checkbox>Remember me</Checkbox>
              <a href="/">Forgot Password</a>
            </Form.Item>

            <Form.Item className="submit-item">
              <Button type="primary" htmlType="submit" onClick={() => { setState({ spinning: true }); }}>
                Let's go!
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <a href="/" className="sign-up">Create Account</a>
      </div>
    </Spin>
  );
};

export default Login;
