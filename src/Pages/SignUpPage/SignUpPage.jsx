import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperContainerRightText, WrapperRightText } from './StyleSignUp'
import InputFormComponent from '../../Components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/sign.png'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../Service/UserService'
import { useMutationHook } from '../../Hooks/useMutationHook'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import * as message from '../../Components/MessageComponent/MessgeComponent'

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutationHook(
    data => UserService.registerUser(data)
  )

 const {data, isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if(isSuccess) {
      message.success('Đăng ký thành công!')
      navigate('/sign-in')
    }
    if(isError) {
      message.error('Đăng ký thất bại! Email hoặc số điện thoại đã tồn tại.')
    }
  },[isSuccess, isError])

  const handleOnChangeName = (value) => {
    setName(value)
  }

  const handleOnChangePhone = (value) => {
    setPhone(value)
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignUp = () => {
    mutation.mutate({ email, password, phone, name, confirmPassword})
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  return  (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
      <div style={{width: '800px', borderRadius: '5px', backgroundColor: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Đăng ký</h1>
          <p>Đăng ký để mua hàng</p>         
          <InputFormComponent placeholder="Họ và Tên" value={name} onChange = {handleOnChangeName} />
          <InputFormComponent placeholder="Số điện thoại" value={phone} onChange={handleOnChangePhone} />
          <InputFormComponent placeholder="Vui lòng nhập email" value={email} onChange = {handleOnChangeEmail} />
          <div style={{ position: 'relative' }}>
            <InputFormComponent placeholder="Vui lòng nhập mật khẩu" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
            <span onClick={togglePasswordVisibility} style={{ zIndex: 10, position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}>
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <InputFormComponent placeholder="Vui lòng nhập lại mật khẩu" type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnChangeConfirmPassword} />

            <span onClick={toggleConfirmPasswordVisibility} style={{ zIndex: 10, position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}>
              {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <ButtonComponent 
            disabled={!email.length || !name.length || !phone.length || !password.length || !confirmPassword.length}
            onClick={handleSignUp} 
            style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '40px', width: '100%', margin: '26px 0 10px'}} 
            textButton="Đăng ký" />
          <div style={{cursor: 'pointer'}}>
          <p>Bạn đã có tài khoản? <WrapperRightText onClick={handleNavigateSignIn}>Đăng nhập</WrapperRightText></p>
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

export default SignUpPage