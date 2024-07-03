import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ style, size, type, textButton,disabled, ...rests }) => {
  const combinedStyle = {  ...style };
  
  return (
    <Button style={{
      opacity: disabled ? 0.6 : 1,
     ...combinedStyle,
      }}
     size={size} type={type} {...rests}>
      {textButton}
    </Button>
  );
};

export default ButtonComponent;
