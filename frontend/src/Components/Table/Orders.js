import React ,{useEffect,useState}from 'react';
import { Space, Table, Tag } from 'antd';
import { getAllOrders } from '../../Service/Order';

const columns = [
  {
    title: 'OrderId',
    dataIndex: 'key',

  },
  {
    title: 'OrderName',
    dataIndex: 'ordername',
 
  },
  {
    title: 'OrderDate',
    dataIndex: 'orderdate',
    render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();  // Only show the date portion
      },
  },
  {
    title: 'CustomerId',
    dataIndex: 'customerid',
 
  },
];

const OrdersTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const orders = await getAllOrders();
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
export default OrdersTable;