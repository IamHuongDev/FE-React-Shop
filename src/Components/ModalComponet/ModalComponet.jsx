import React from 'react';
import {  Modal } from 'antd';

const ModalComponent = ({title = 'Modal', isModalOpen = false, children, ...rests}) => {
  
  return (
    <>
      <Modal title={title} open={isModalOpen} {...rests}>
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;