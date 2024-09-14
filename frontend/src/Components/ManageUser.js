import React, { useState, useEffect } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Button, Modal, Select, message,InputNumber, Row, Col } from 'antd';
import { getAllUsers, createUser, editUser, updateUser, deleteUser } from '../Service/User'; // Import the service
import AdminHeader from './AdminHeader';

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  if (dataIndex === 'role') {
    inputNode = (
      <Select>
        <Option value="Admin">Admin</Option>
        <Option value="Customer">Customer</Option>
        <Option value="ProductOwner">ProductOwner</Option>
      </Select>
    );
  }
    
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ManageUser = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        setData(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ name: '', role: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => setEditingKey('');

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedUser = {
          username: row.username,
          role: row.role,
        };

        // Call the Edit User API
        await updateUser(item.key, updatedUser); // key represents the user's ID
        
        // Update table data after successful edit
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        message.success('User updated successfully');
      } else {
        message.error('User not found for editing');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Failed to update user');
    }
  };

  const handleDelete = async (key) => {
    try {
      // Call the Delete User API
      await deleteUser(key); // key is the user ID (assumed from `dataSource` key)

      // Remove the user from the table
      const newData = data.filter((item) => item.key !== key);
      setData(newData);
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  // Show the modal for adding a new user
  const showModal = () => setIsModalVisible(true);

  // Handle modal submission (create user)
  const handleOk = async () => {
    try {
      const values = await modalForm.validateFields();
      const newUser = {
        username: values.username,
        role: values.role,
        password: values.password
      };
      const response = await createUser(newUser); // Call the createUser API
      
      const newData = {
        key: response.id.toString(), // Assuming the API response returns an 'id'
        username: response.username,
        role: response.role
      };
      
      setData([newData, ...data]);
      setIsModalVisible(false);
      modalForm.resetFields(); // Reset the form after successful creation
      message.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Failed to create user');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
  };

  const columns = [
    { title: 'Id', dataIndex: 'key', width: '23%' },
    { title: 'Username', dataIndex: 'username', width: '23%', editable: true },
    { title: 'Role', dataIndex: 'role', width: '23%', editable: true },
    {
      title: 'Edit User',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete User',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'role' ? 'select' : 'text', 
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <AdminHeader/>
      <br />
      <Row>
        <Col span={23}  style={{ textAlign: 'right' }}>
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        Add User
      </Button>
        </Col>
      </Row>
      

      {/* Modal for adding a new user */}
      <Modal
        title="Add New User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={modalForm} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Customer">Customer</Option>
              <Option value="ProductOwner">ProductOwner</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { 
              required: true, 
              message: 'Please input the password!' 
            },
            { 
              min: 8, 
              message: 'Password must be at least 8 characters long!' 
            },
            {
              pattern: /[A-Z]/,
              message: 'Password must contain at least one uppercase letter!'
            },
            {
              pattern: /[0-9]/,
              message: 'Password must contain at least one number!'
            },


            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 5, onChange: cancel }}
        />
      </Form>
    </div>
  );
};

export default ManageUser;
