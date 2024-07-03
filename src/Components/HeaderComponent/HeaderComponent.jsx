import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Popconfirm, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './styleHeader';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../Service/UserService'
import { resetUser } from '../../Redux/Slides/UserSlide';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'

const HeaderComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  const user = useSelector((state) => state.user)

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin cá nhân</WrapperContentPopup>
    </div>
  );

  return (
    <div style={{width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center'}}>
    <WrapperHeader>
      <Col span={5}>
        <WrapperTextHeader>Fake Shoppe</WrapperTextHeader>
      </Col>
      <Col span={13}>
        <ButtonInputSearch
          size="large"
          placeholder="Tìm kiếm sản phẩm ... "
          textButton="Tìm kiếm"
          color="primary"
        />
      </Col>
      <Col span={6} style={{display: 'flex', gap: '54px', alignItems: 'center', marginLeft: '18px'}}>
        <LoadingComponent isLoading={loading}>
          <WrapperHeaderAccount>
            { userAvatar ? (
              <img alt="user avatar" src={userAvatar} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} />
            ) : <UserOutlined style={{fontSize: '30px'}}/>}
            {user?.access_token ? (
              <>
              <Popover content={content} trigger="click">
                <div style={{fontSize: '18px', cursor: 'pointer'}}>{ userName || 'User'}</div>

              </Popover>
              </>
            ): (
              <div onClick={handleNavigateLogin} style={{ cursor: 'pointer'}}>
              <WrapperTextHeaderSmall>Đăng Nhập / Đăng Ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
            )}
          </WrapperHeaderAccount>
        </LoadingComponent>
        <div>
          <Badge count={4} size='small'>
            <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}} />
          </Badge>
          <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
        </div>
      </Col>
    </WrapperHeader>
  </div>
  )
}

export default HeaderComponent