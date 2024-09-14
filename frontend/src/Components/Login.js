import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../../src/Service/User'; 
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex,message} from 'antd';
import {  Typography } from 'antd';
import LoginHeader from './LoginHeader';
const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.removeItem('accesstoken');

}, []);

const onFinish = async() => {
    
    const result = await login(username, password);

    if (result.success) {
      const { role } = result;
      console.log(role);
      if (role === 'Admin') {
        navigate('/admin'); 
      } else if (role === 'Customer') {
        navigate('/Customer'); 
      }
      else if (role === 'ProductOwner') {
        navigate('/ProductOwner'); 
      }
    } else {
      setError(result.error);
      message.error('Invalid Username or password');
    }
  };

  return (
    <div>

   <LoginHeader/>
    <div
    style={{ 

        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '90vh',
       
       
        
    }}
    >
              <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
              Login
              </Title>
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username"  onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />

      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

export default LoginPage;
