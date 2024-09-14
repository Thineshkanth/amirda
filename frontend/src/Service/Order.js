import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api'; 


export const getAllOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orderdetails`);
      
      return response.data.map(orders => ({
        key: orders.orderid.toString(),
        ordername: orders.ordername,
        orderdate: orders.orderdate,
        customerid:orders.customerid
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  
