import React, { useState } from 'react';
import {
  UserOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import { getItem } from '../../utils';
import HeaderComponet from '../../Components/HeaderComponent/HeaderComponent'
const {  Sider } = Layout;

const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '1'),
    getItem('Bill', '2'),
    getItem('Alex', '3'),
  ]),
  getItem('Producct', 'sub2', <ProfileOutlined />, [
    getItem('Tom', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6'),
  ]),
];
const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['user']);
  const rootSubMenuKeys = ['user', 'product']
  const [keySelected, setKeySelected] = useState('')

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items}
              onClick={handleOnClick}

            />
        </Sider>
        
        <div style={{ flex: 1}}>
          {keySelected === '6' && <span>key 6</span>} 
        </div>

      </Layout>
    </div>
  );
};
export default AdminPage;