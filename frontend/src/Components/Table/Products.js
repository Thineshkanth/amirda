import React ,{useEffect,useState}from 'react';
import { Space, Table, Tag } from 'antd';
import { getAllOrders } from '../../Service/Order';
import { getAllProducts } from '../../Service/Product';

const columns = [
  {
    title: 'ProductId',
    dataIndex: 'key',

  },
  {
    title: 'ProductName',
    dataIndex: 'productname',
 
  },
  {
    title: 'ProductDate',
    dataIndex: 'productexpiredate',
    render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();  // Only show the date portion
      },
  },
  {
    title: 'OrderId',
    dataIndex: 'orderid',
 
  },
];

const ProductsTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const orders = await getAllProducts();
            setData(orders);
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        };
    
        fetchData();
      }, []);


return(

<Table 
columns={columns} 
dataSource={data} 
pagination={{ pageSize: 4 }}
/>
);


};
export default ProductsTable;