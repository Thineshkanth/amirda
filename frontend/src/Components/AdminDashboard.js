import React ,{useState}from 'react';
import { Card, Col, Row } from 'antd';  
import { Select, Space } from 'antd';
import AdminHeader from './AdminHeader';
import OrdersTable from './Table/Orders';
import ProductsTable from './Table/Products';

//selectbox filter
const handleChangefilter = (value) => {
    console.log(`selected ${value}`);
  };

//tabs config
const tabList = [
    {
      key: 'Orders',
      tab: 'Orders',
    },
    {
      key: 'Products',
      tab: 'Products',
    },
  ];
  const contentList = {
    Orders: <p><OrdersTable/></p>,
    Products: <p><ProductsTable/></p>,
  };
  

const AdminDashboard = () => {

    //tab config
    const [activeTabKey1, setActiveTabKey1] = useState('Orders');
    const onTab1Change = (key) => {
      setActiveTabKey1(key);
    };

    return (
        //cards
        <div>
          {/* <Row gutter={16}>
    <Col span={8}>
      <Card title="Card title" bordered={true}>
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={true} >
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={true}>
        Card content
      </Card>
    </Col>
  </Row> */}
        
      {/* tabs */}
        <div>
      <Card
        style={{
          width: '100%',
        }}
        title="Overview"

        extra={
            <Select
            defaultValue="Today"
            style={{
              width: 120,
            }}
            onChange={handleChangefilter}
            options={[
              {
                value: 'Today',
                label: 'Today',
              },
              {
                value: 'This Week',
                label: 'This Week',
              },
              {
                value: 'This Month',
                label: 'This Month',
              },
              {
                value: 'This Year',
                label: 'This year',
               
              },
            ]}
          />
    }
      


        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    
      <br />
      <br />
      
    </div>
    </div>

    );
};

export default AdminDashboard;
