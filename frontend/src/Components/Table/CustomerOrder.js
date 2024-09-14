import React ,{useEffect,useState}from 'react';
import { Space, Table, Tag } from 'antd';
import { getCustomerOrder } from '../../Service/Product';

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
  }
];
const CustomerOrderTable = ({ customerId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getCustomerOrder(customerId);
        setData(orders);
      } catch (error) {
        console.error(`Failed to fetch orders for customer ID ${customerId}:`, error);
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId]);

return(

<Table 
columns={columns} 
dataSource={data} 
pagination={{ pageSize: 4 }}
/>
);

};
export default CustomerOrderTable;