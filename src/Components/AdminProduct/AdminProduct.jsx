import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './StyleAdminProduct'
import { Button, Form, Input, Modal, Upload, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../Service/ProductService'
import { useMutationHook } from '../../Hooks/useMutationHook'
import * as message from '../../Components/MessageComponent/MessgeComponent'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponet/ModalComponet'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user)

  const searchInput = useRef(null);

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
  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    type: '',
    image: '',
    price: '',
    description: '',
    countInStock: '',
    discount: '',
    rating: ''
  })

  const [form] = Form.useForm();

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

  
  const mutationUpdate = useMutationHook(
    async (data) => {
    const { id, token, ...rests } = data;
    const res = await ProductService.updateProduct(id, token, {...rests}); 
    return res;
  }
  );

  const mutationDelete = useMutationHook(
    (data) => {
      const { id, token } = data;
      const res = ProductService.deleteProduct(id, token);
      return res;
    }
  );

  const getAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      return res;
    } catch (error) {
      console.log('error get all product »»»»»', error);
    }
  }

  const getDetailProducts = async (rowSelected) => {
    if (!rowSelected) {
      console.error('Invalid rowSelected value:', rowSelected);
      return;
    }
    try {
      const res = await ProductService.getDetailProduct(rowSelected);
      console.log('««««« res »»»»»', res);
      if (res?.data) {
        setStateProductDetail({
          name: res?.data?.name,
          type: res?.data?.type,
          image: res?.data?.image,
          price: res?.data?.price,
          description: res?.data?.description,
          countInStock: res?.data?.countInStock,
          discount: res?.data?.discount,
          rating: res?.data?.rating,
        });
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      console.error('error »»»»»', error);
    }
  };
  

  useEffect(() => {
    form.setFieldsValue(stateProductDetail)
  },[form, stateProductDetail])

  useEffect(() => {
    if(rowSelected) {
      getDetailProducts(rowSelected)
    }
  },[rowSelected])

  console.log('««««« stateProduct »»»»»', stateProductDetail);

  const handleEditProduct = async () => {
    if(rowSelected) {
      getDetailProducts()
    }
    setIsOpenDrawer(true)
    console.log('««««« rowSelected »»»»»', rowSelected);
  }


 const {data, isLoading, isSuccess, isError} = mutation
 const {data: dataUpdate, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate} = mutationUpdate
 const {data: dataDelete, isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete} = mutationDelete




 const renderAction = () => {
  return (
    <div>
    <DeleteOutlined style={{fontSize: '30px', color: 'red', cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)} />
    <EditOutlined style={{fontSize: '30px', color: 'orange', cursor: 'pointer', marginLeft: '20px'}} onClick={handleEditProduct}/>
  </div>
  )
 }

 const queryProduct = useQuery({
  queryKey: ['product'],
  queryFn: getAllProducts,
  retry: 3,
  retryDelay: 1000,
  });

  const {isLoading: isLoadingProduct, data: product } = queryProduct

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
   
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      // sorter: (a, b) => a?.name.localeCompare(b?.name), //c1
      sorter: (a, b) => a?.name.length - b?.name.length, //c2
      ...getColumnSearchProps('name'),

    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a?.price - b?.price,
      filters: [
        {
          text: '> 50',
          value: '>',
        },
        {
          text: '= 50',
          value: '=',
        },
        {
          text: '< 50',
          value: '<',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>') {
          return record.price > 50;
        } else if (value === '=') {
          return record.price === 50;
        } else if (value === '<') {
          return record.price < 50;
        }
      }
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a?.rating - b?.rating,
      filters: [
        {
          text: '5 sao',
          value: '5',
        },
        {
          text: '4 sao',
          value: '4',
        },
        {
          text: '3 sao',
          value: '3',
        },
        {
          text: '2 sao',
          value: '2',
        },
        {
          text: '1 sao',
          value: '1',
        },
        {
          text: '0 sao',
          value: '0',
        },
      ],
      onFilter: (value, record) => {
        if (value === '5') {
          return record.rating = 5;
        } else if (value === '4') {
          return record.rating >= 4 && record.rating < 5;
        } else if (value === '3') {
          return record.rating >= 3 && record.rating < 4;
        } else if (value === '2') {
          return record.rating >= 2 && record.rating < 3;
        } else if (value === '1') {
          return record.rating >= 1 && record.rating < 2;
        } else if (value === '0') {
          return record.rating >= 0 && record.rating < 1;
        }
      }
        
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
      sorter: (a, b) => a?.countInStock - b?.countInStock,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a?.type.localeCompare(b?.type), 
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: renderAction

    },
  ];
  const dataTable = product?.data?.length && product?.data?.map((item) => { return { ...item, key: item._id } });


 useEffect(() => {
   if (isSuccess && data?.status === 'OK') {
     message.success('Thêm sản phẩm thành công')
     handleCancel();
     form.resetFields();
   } else if(isError){
    message.error('Thêm sản phẩm thất bại!')
   }
 },[isSuccess])

 useEffect(() => {
  if (isSuccessUpdate && dataUpdate?.status === 'OK' ) {
    message.success('Cập nhật thành công');
    handleCloseDrawer(); 
  } else if (isErrorUpdate) {
    message.error('Cập nhật sản phẩm thất bại!');
  }
}, [isSuccessUpdate]);

useEffect(() => {
  if (isSuccessDelete && dataDelete?.status === 'OK') {
    message.success('Xóa sản phẩm thành công!');
    handleCancelDelete()
  } else if (isErrorDelete) {
    message.error('Xóa sản phẩm thất bại!');
  }
}, [isSuccessDelete]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    mutation.mutate(stateProduct);
  };
 
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate({
      id: rowSelected,
      token: user?.access_token
    },
    {
      onSettled: () => {
        handleCancelDelete()
        queryProduct.refetch()
      }
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      type: '',
      image: '',
      price: '',
      description: '',
      countInStock: '',
      discount: '',
      rating: ''
    });
    form.resetFields();
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const onFinish = () => {
    mutation.mutate(stateProduct,
      {
        onSettled: () => {
          queryProduct.refetch()
        }
      }
    )
  }

  const handleOnChange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value })
  }
  const handleOnChangeEdit = (e) => {
    console.log('««««« check »»»»»',e.target.name, e.target.value);
    setStateProductDetail({ ...stateProductDetail, [e.target.name]: e.target.value })
  }

  const handleOnChangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProduct({ ...stateProduct, image: file.preview });
}
  const handleOnChangeAvatarDetai = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProductDetail({ ...stateProductDetail, image: file.preview });
}

const onUpdateProduct = () => {
  mutationUpdate.mutate({
    id: rowSelected,
    token: user?.access_token,
    ...stateProductDetail 
  },
  {
    onSuccess: () => {
      message.success('Cập nhật thành công')
    },
    onError: () => {
      message.error('Cập nhật sản phẩm thất bại!')
    },
    onSettled: () => {
      handleCloseDrawer()
      queryProduct.refetch()
    }
  }
  );
};

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}><PlusOutlined style={{ fontSize: '40px' }} /></Button>
      </div>
      <div>
        <TableComponent columns={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
            };
          }}
        />
      </div>
      <ModalComponent title="Thêm mới sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
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
              offset: 11,
              span: 13,
            }}
          >
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="70%">
      <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onUpdateProduct}
          autoComplete="on"
          form={form}
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
            <InputComponent value={stateProductDetail['name']} onChange={handleOnChangeEdit} name="name" />
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
            <InputComponent value={stateProductDetail.type} onChange={handleOnChangeEdit} name="type" />
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
            <InputComponent value={stateProductDetail.price} onChange={handleOnChangeEdit} name="price" />
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
            <InputComponent value={stateProductDetail.description} onChange={handleOnChangeEdit} name="description" />
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
            <InputComponent value={stateProductDetail.countInStock} onChange={handleOnChangeEdit} name="countInStock" />
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
            <InputComponent value={stateProductDetail.rating} onChange={handleOnChangeEdit} name="rating" />
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
            <InputComponent value={stateProductDetail.discount} onChange={handleOnChangeEdit} name="discount" />
          </Form.Item>
          
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
              onChange={handleOnChangeAvatarDetai}
            >
              {stateProductDetail?.image ? (
                <img src={stateProductDetail?.image} alt="avatar" style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }} />
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
              offset: 11,
              span: 13,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>


      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct
