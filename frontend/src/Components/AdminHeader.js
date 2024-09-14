import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;


const AdminHeader = () => {

  const navigate = useNavigate();  
  const handleManageUsers = () => {
    navigate('/viewUsers');
  };

  const handleHome = () => {
    navigate('/admin');
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
          <Button type='primary' onClick={handleHome}>Home</Button>
          </Col>
          <Col>
            <h1 style={{ color: 'white', margin: 0 }}>
                Admin Pannel
            </h1>
          </Col>
          <Col>
          <div>
              <Button type="primary" style={{ marginRight: '20px' }} onClick={handleManageUsers}>
                Manage Users
              </Button>
              <Button danger onClick={handleLogout}>Logout</Button>
            </div>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

export default AdminHeader;
