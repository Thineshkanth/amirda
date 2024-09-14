import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_BASE_URL = 'http://localhost:8080/api'; 


export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    const data = response.data;
   
    // const userdetails=data.userdetails;
    // const role=userdetails.role;
    // const id=userdetails.id;
    const accesstoken=data.accesstoken;
    localStorage.setItem('accesstoken', accesstoken);
    const decodedToken = jwtDecode(accesstoken);
    const role=decodedToken.role;
    const id=decodedToken.id;
    console.log(role+"thinesh");
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);

    return { success: true, role };
  } catch (error) {
    return { success: false, error: error.response ? error.response.data.error : 'Login failed' };
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`); 
    localStorage.removeItem('accesstoken');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response ? error.response.data.error : 'Logout failed' };
  }
};

//get user details

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/userDetails`);
    
    return response.data.map(user => ({
      key: user.id.toString(),
      username: user.username,
      role: user.role
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

//create new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

//update user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

//delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
