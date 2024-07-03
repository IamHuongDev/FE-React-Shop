import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeaderProfile, WrapperInput, WrapperLable, WrapperUploadFile } from './StyleProfile'
import InputFormComponent from '../../Components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../Service/UserService'
import { useMutationHook } from '../../Hooks/useMutationHook'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import { Button, Upload, message } from 'antd'
import { initiaUser } from '../../Redux/Slides/UserSlide'
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setphone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    // const [password, setPassword] = useState('')
    // const [loading, setLoading] = useState(false)
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
     )
   
     const {data, isLoading, isSuccess, isError} = mutation
   

    useEffect(() =>{
        setEmail(user?.email)
        setName(user?.name)
        setphone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        // setPassword('')
    },[user])

    useEffect(() => {
        if (isSuccess) {
            message.success('Cập nhật thông tin thành công')
            // setLoading(false)
            handleGetDetailUser(user?.id, user?.access_token)
        }
        if (isError) {
            message.error('Cập nhật thông tin thất bại. Vui lòng thử lại')
            // setLoading(false)
        }
    },[isSuccess, isError])

    const handleGetDetailUser = async (id, access_token) => {
        try {
          const res = await UserService.getDetailUser(id, access_token)
          dispatch(initiaUser({...res?.data, access_token: access_token}))
          // console.log(res)
        } catch (error) {
          console.log(error)
        }
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnChangeName = (value) => {
        setName(value)
    }

    const handleOnChangePhone = (value) => {
        setphone(value)
    }

    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
        setAvatar(file.url || file.preview);
    }
    
    // const handleOnChangePassword = (value) => {
    //     setPassword(value)
    // }

    const handleUpdateProfile = () => {
        mutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address,
            avatar,
            // password,
            access_token: user?.access_token,
        })
    }


  return (
    <div style={{width: '1270px', margin: '0 auto', height: '500px'}}>
        <WrapperHeaderProfile>Thông tin cá nhân</WrapperHeaderProfile>
      
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLable htmlFor='name'>Name</WrapperLable>
                    <InputFormComponent id="name" style={{width: '300px'}} value={name} onChange={handleOnChangeName} />
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px', margin: '26px 0 10px'}} 
                    textButton="Cập nhật" />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='email'>Email</WrapperLable>
                    <InputFormComponent id="email" style={{width: '300px'}} value={email} onChange={handleOnChangeEmail} />
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px', margin: '26px 0 10px'}} 
                    textButton="Cập nhật" />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='phone'>Phone</WrapperLable>
                    <InputFormComponent id="phone" style={{width: '300px'}} value={phone} onChange={handleOnChangePhone} />
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px', margin: '26px 0 10px'}} 
                    textButton="Cập nhật" />
                </WrapperInput>
                <WrapperInput >
                    <WrapperLable htmlFor='avatar'>Avatar</WrapperLable>
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} alt='avatar' style={{height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover'}} />
                    )}
                    {/* <InputFormComponent id="avatar" style={{width: '300px'}} value={avatar} onChange={handleOnChangeAvatar} /> */}
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px'}} 
                    textButton="Cập nhật" />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor='address'>Address</WrapperLable>
                    <InputFormComponent id="address" style={{width: '300px'}} value={address} onChange={handleOnChangeAddress} />
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px', margin: '26px 0 10px'}} 
                    textButton="Cập nhật" />
                </WrapperInput>
                {/* <WrapperInput>
                    <WrapperLable htmlFor='password'>Password</WrapperLable>
                    <InputFormComponent id="password" style={{width: '300px'}} value={password} onChange={handleOnChangePassword} />
                    <ButtonComponent 
                    onClick={handleUpdateProfile} 
                    style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '30px', width: '100px', margin: '26px 0 10px'}} 
                    textButton="Cập nhật" />
                </WrapperInput> */}

            </WrapperContentProfile>
      
    </div>
  )
}

export default ProfilePage