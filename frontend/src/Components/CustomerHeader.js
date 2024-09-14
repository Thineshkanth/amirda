import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;


const CustomerHeader = () => {

  const navigate = useNavigate();  

  const handleHome = () => {
    navigate('/customer');
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
          <Button type='primary' onClick={handleHome}>amirda</Button>
          </Col>
          <Col>
            <h1 style={{ color: 'white', margin: 0 }}>
               Welcome to Amirda Shop
            </h1>
          </Col>    
          <Col>
          <div>
          <Button danger onClick={handleLogout} >Logout</Button>
          </div>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

export default CustomerHeader;
