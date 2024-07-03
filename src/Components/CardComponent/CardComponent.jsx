import React from 'react'
import { StyleNameProductItem, WrapperDiscountText, WrapperPriceText, WrapperRepostText, WrapperStyleCar, WrapperStyleTextSell } from './StyleCard';
import { StarFilled, } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';

const CardComponent = (props) => {
  const { name, price, image, countInStock, description, rating, type, discount, selled} = props;

  return (
    <WrapperStyleCar
    hoverable
    header= {{height:'230px', width:'230px'}}
    style={{
      width: 230,
    }}
    body={{padding: '10px'}}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <img src={logo} alt='logo' style={{width: '68px', height: '14px', position: 'absolute', left: -1, top: -1, borderTopLeftRadius: '8px'}} />
    <StyleNameProductItem>{name}</StyleNameProductItem>
    <WrapperRepostText>
        <span style={{marginRight: '4px'}}>
            <span>{rating}</span>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 1000} +</WrapperStyleTextSell>
    </WrapperRepostText>
    <WrapperPriceText>
        <span style={{marginRight: '8px'}}>{price} đ</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
    </WrapperPriceText>
  </WrapperStyleCar>
  )
}

export default CardComponent