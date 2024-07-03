import React from 'react'
import { WrapperInputStyle } from './StyleInputForm';

const InputFormComponent = (props) => {
    const { placeholder, type = "text", onChange, ...rests } = props

    const handleOnChangeInput = (e) => {
      onChange(e.target.value)
    }

  return (
    <WrapperInputStyle 
      style={{ marginBottom: '10px', borderRadius: 'unset' }}
      type={type}
      placeholder={placeholder}
      value={props.value}
      onChange={handleOnChangeInput}
      {...rests}
    />
  )
}

export default InputFormComponent
