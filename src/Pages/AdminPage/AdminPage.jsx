import React, { useState } from 'react';
import {
  UserOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import { getItem } from '../../utils';
import HeaderComponet from '../../Components/HeaderComponent/HeaderComponent'
import AdminUser from '../../Components/AdminUser/AdminUser';
import AdminProduct from '../../Components/AdminProduct/AdminProduct';
const {  Sider } = Layout;

const items = [
  getItem('User', 'user', <UserOutlined />),
  getItem('Producct', 'product', <ProfileOutlined />),
];
const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser/>
        );
      case 'product':
        return (
          <AdminProduct/>
        );
      default:
        return <></>;
    }
  }

  const handleOnClick = ({key}) => {
    setKeySelected(key)
  }

  return (
    <div>
      <HeaderComponet isHiddenSearch isHiddenCart />
      <Layout
        style={{
          minHeight: '100vh',
          display: 'flex'
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
              mode="inline"
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items}
              onClick={handleOnClick}

            />
        </Sider>
        
        <div style={{ flex: 1, padding: '20px'}}>
          {renderPage(keySelected)}
        </div>

      </Layout>
    </div>
  );
};
export default AdminPage;