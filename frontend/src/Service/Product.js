import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api'; 


export const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/productdetails`);
      
      return response.data.map(products => ({
        key: products.productid.toString(),
        productname: products.productname,
        productexpiredate: products.productexpiredate,
        orderid:products.orderid,
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };


  export const getCustomerOrder = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orderdetails/${id}`);
      
      return response.data.map(order => ({
        key: order.orderid.toString(),
        ordername: order.ordername,
        orderdate: order.orderdate,
        customerid: order.customerid,
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };
  