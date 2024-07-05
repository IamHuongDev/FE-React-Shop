import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './StyleAdminProduct'
import { Button, Form, Input, Modal, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../Service/ProductService'
import { useMutationHook } from '../../Hooks/useMutationHook'
import * as message from '../../Components/MessageComponent/MessgeComponent'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    image: '',
    price: '',
    description: '',
    countInStock: '',
    discount: '',
    rating: ''
  })


  // const mutation = useMutationHook(
  //   data => ProductService.createProduct(data)
  // )
  
  const mutation = useMutationHook(
    data => {
      const {
        name,
        type,
        image,
        price,
        description,
        countInStock: countInStock,
        discount,
        rating
      } = data;
      const res = ProductService.createProduct({
        name,
        type,
        image,
        price,
        description,
        countInStock,
        discount,
        rating
      })
      return res
    }
  )

 const {data, isLoading, isSuccess, isError} = mutation

 useEffect(() => {
   if (isSuccess && data?.status === 'OK') {
     message.success('Thêm sản phẩm thành công')
     setIsModalOpen(false)
     setStateProduct({
       name: '',
       type: '',
       image: '',
       price: '',
       description: '',
       countInStock: '',
       discount: '',
       rating: ''
     })
   } else {
     message.error('Thêm sản phẩm thất bại')

   }
 },[isSuccess, isError])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    mutation.mutate(stateProduct);
  };
 

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    console.log('Success:');
  }


  const handleOnChangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProduct({ ...stateProduct, image: file.preview });
}

  const handleOnChange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}><PlusOutlined style={{ fontSize: '40px' }} /></Button>
      </div>
      <div>
        <TableComponent />
      </div>
      <Modal title="Thêm mới sản phẩm" open={isModalOpen} onCancel={handleCancel} okText="">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your type!',
              },
            ]}
          >
            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
          </Form.Item>
          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: 'Please input your countInStock!',
              },
            ]}
          >
            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: 'Please input your rating!',
              },
            ]}
          >
            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: 'Please input your discount!',
              },
            ]}
          >
            <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
          </Form.Item>
          {/* <Form.Item
            label="Images"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please upload at least one image!',
              },
            ]}
          >
          <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            {setStateProduct?.image && (
            <img src={setStateProduct?.image} alt='avatar' style={{height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover'}} />
            )}
          </WrapperUploadFile>
          </Form.Item> */}
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your image!',
              },
            ]}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleOnChangeAvatar}
            >
              {stateProduct?.image ? (
                <img src={stateProduct?.image} alt="avatar" style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminProduct
