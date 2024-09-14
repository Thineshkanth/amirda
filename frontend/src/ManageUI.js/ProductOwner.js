import React from 'react';
import { Space, Typography } from 'antd';
import ProductsTable from '../Components/Table/Products';
import ProductOwnerHeader from '../Components/ProductOwnerHeader';
const { Title } = Typography;


const ProductOwner = () => {
    return (
        <div>
     <ProductOwnerHeader/>
            <div>
                <div>
                <Title level={3} style={{ textAlign: 'center' }}>All Ordered Products Details</Title>
                <br/>
                </div>
            </div>  
        <ProductsTable/>
        </div>
    );
};

export default ProductOwner;