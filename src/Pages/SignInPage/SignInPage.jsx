import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperContainerRightText, WrapperRightText } from './StyleSignIn'
import InputFormComponent from '../../Components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import * as UserService from '../../Service/UserService'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/sign.png'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../../Hooks/useMutationHook'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import * as message from '../../Components/MessageComponent/MessgeComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { initiaUser } from '../../Redux/Slides/UserSlide'


const SignInPage = () => {
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const mutation = useMutationHook(
     data => UserService.loginUser(data)
  )

  console.log('««««« mutation »»»»»', mutation);

  const {data, isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success('Đăng nhập thành công')
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decodedToken = jwtDecode(data?.access_token)
        if (decodedToken?.id) {
          handleGetDetailUser(decodedToken?.id, data?.access_token)
        }
      }
    }
    if (isError) {
      message.error('Đăng nhập thất bại. Vui lòng thử lại')
    }
  },[isSuccess, isError])

  const handleGetDetailUser = async (id, access_token) => {
    try {
      const res = await UserService.getDetailUser(id, access_token)
      dispatch(initiaUser({...res?.data, access_token: access_token}))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({ email, password })
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '5px', backgroundColor: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Đăng nhập</h1>
          <p>Đăng nhập để mua hàng</p>
          <InputFormComponent placeholder="Vui lòng nhập email" value={email} onChange={handleOnChangeEmail} />
          <div style={{ position: 'relative' }}>
            <InputFormComponent placeholder="Vui lòng nhập mật khẩu" type={isShowPassword ? "text" : "password"} alue={password} onChange={handleOnChangePassword}/>
            <span onClick={togglePasswordVisibility} style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px', cursor: 'pointer' }}>
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
            
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '40px', width: '100%', margin: '26px 0 10px' }} textButton="Đăng nhập" ></ButtonComponent>
         
          <div>
            <WrapperRightText>Quên mật khẩu</WrapperRightText>
            <p>Chưa có tài khoản? <WrapperRightText onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperRightText></p>
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={ImageLogo} alt='image' preview={false} height="203px" width="203px" />
          <WrapperContainerRightText>Mua sắm tại Fake Shoppe</WrapperContainerRightText>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage
