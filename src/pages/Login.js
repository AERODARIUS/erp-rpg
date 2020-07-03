import React from 'react';
import {
  Form, Input, Button, Checkbox, Card,
} from 'antd';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    onLogin();
    history.push('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <div>Password</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className="remember-forgot">
            <Checkbox>Remember me</Checkbox>
            <a href="/">Forgot Password</a>
          </Form.Item>

          <Form.Item className="submit-item">
            <Button type="primary" htmlType="submit">
              Let´s go!
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <a href="/" className="sign-up">Create Account</a>
    </div>
  );
};

export default Login;
