
import React from 'react'
import {
    SearchOutlined
  } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const {size, placeholder, textButton, color} = props
  return (
    <div style={{display: 'flex'}}>
        <InputComponent style={{borderRadius: 'unset'}} size={size} placeholder={placeholder} />
        <ButtonComponent style={{borderRadius: 'unset'}} size={size} type={color} textButton={textButton} icon={<SearchOutlined />}/>
       
    </div>
  )
}

export default ButtonInputSearch