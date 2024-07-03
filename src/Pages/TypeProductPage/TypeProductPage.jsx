import React from 'react'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import CardComponent from '../../Components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProduct, WrapperProductPage } from './StyleProductPage'
import { Col, Pagination } from 'antd'

const TypeProductPage = () => {
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
      };
  return (
    <div style={{ width: '100%', background: '#efefef' }}>
        <div style={{width: '1270px', margin: '0 auto'}}>
            <WrapperProductPage >
                <WrapperNavbar span={4}>
                    <NavbarComponent />
                </WrapperNavbar>
                <Col span={20}>
                <WrapperProduct>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProduct>
                <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} />
                </Col>
            </WrapperProductPage>
        </div>
    </div>
  )
}

export default TypeProductPage