import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;


const LoginHeader = () => {

  const navigate = useNavigate();  
  const handleManageUsers = () => {
    navigate('/viewUsers');
  };

  const handleHome = () => {
    navigate('/productOwner');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
  };



  return (
    <div>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#4096ff',
        }}
      >
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
      
          </Col>
          <Col>
            <h1 style={{ color: 'white', margin: 0 }}>
               Login and enter to the amirda world
            </h1>
          </Col>    
          <Col>
          <div>

          </div>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

export default LoginHeader;
