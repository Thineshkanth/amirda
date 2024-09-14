import React from 'react';
import {  Typography } from 'antd';
import CustomerHeader from '../Components/CustomerHeader';
import CustomerOrderTable from '../Components/Table/CustomerOrder';

const { Title } = Typography;

const Customer = () => {
    return (
        <div>
            <CustomerHeader/>
            <div>
                <div>
                <Title level={3} style={{ textAlign: 'left' }}>Order Details</Title>
                <br/>
                </div>
            </div>  
            <CustomerOrderTable customerId={localStorage.getItem('id')}/>
        </div>
    );
};

export default Customer;