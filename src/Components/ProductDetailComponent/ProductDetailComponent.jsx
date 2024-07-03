import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/product1.jpg'
import imageProductSmall from '../../assets/images/product2.jpg'
import { WrapperAddress, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStylePriceProduct, WrapperStylePriceTextProduct, WrapperStyleTextSell } from './StyleProductDetailComponent'
import { StarFilled,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
    const onChange = () => {
       
      };
  return (
    <div>
        <Row style={{padding: '16px', background: '#fff', borderRadius: '5px'}}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src={imageProduct} alt='image product' preview={false} />  {/* style={{width: '368px', height: '368px'}} */}
                <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct> Rượu Mortlach Aged 12 Years Single Malt Scotch Whisky 43.4% 700ml [Kèm Hộp] </WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperStylePriceProduct>
                    <WrapperStylePriceTextProduct>200.000</WrapperStylePriceTextProduct>
                </WrapperStylePriceProduct>
                <WrapperAddress>
                    <span> Giao đến </span>
                    <span className='address'> TP. Việt Trì, P. Gia Cẩm, Phú Thọ </span> - 
                    <span className='change__address'> Đổi địa chỉ </span>
                </WrapperAddress>
                <WrapperQualityProduct>
                    <div >Số lượng </div>
                    <div style={{marginTop: '10px' , borderBottom: '1px solid rgb(235, 235, 240)', paddingBottom: '10px'}}>
                        <ButtonComponent icon={<PlusOutlined />}/>
                        <InputNumber min={1} defaultValue={1} onChange={onChange} style={{ borderRadius: 'unset',width: '60px'}}/>
                        <ButtonComponent icon={<MinusOutlined />}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center',  gap: '10px', marginTop: '20px'}}>
                        <ButtonComponent style={{ background: 'rgb(255, 66, 7)', color: 'rgb(255, 255, 255)', border: 'none', fontWeight: '500', height: '40px', width: '220px'}} textButton="Mua ngay" />
                        <ButtonComponent style={{ background: 'rgb(255, 255, 255)', color: 'rgb(10, 104, 255)', border: '1px solid rgb(10, 104, 255)', fontWeight: '500', height: '40px', width: '220px'}} textButton="Thêm vào giỏ" />
                    </div>
                </WrapperQualityProduct>
            </Col>
        </Row>
    </div>
  )
}

export default ProductDetailComponent