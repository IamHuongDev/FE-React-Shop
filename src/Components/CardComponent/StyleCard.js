import { Card } from "antd";
import styled from "styled-components";

export const WrapperStyleCar = styled(Card)`
    width: 230px;
    & img {
        width: 230px;;
        height: 230px;
    },
    position: relative;
`

export const StyleNameProductItem = styled.div`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: rgb(56, 56, 61);
`
export const WrapperRepostText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`
export const WrapperPriceText = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: rgb(255, 66, 78); 
`

export const WrapperDiscountText = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    color: rgb(255, 66, 78); 
    padding-left: 8px;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`