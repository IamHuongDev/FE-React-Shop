import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    width: 64px !important;
    object-fit: cover;
    height: 64px;
`
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const WrapperStylePriceProduct = styled.div`
    background: rgb(250, 250, 250);
    boder-radius: 5px;
`
export const WrapperStylePriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
    margin-right: 8px;
    padding: 10px;
    margin-top: 10px;
`
export const WrapperAddress= styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    span.change__address {
        color: rgb(11, 116, 259);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }

`

export const WrapperQualityProduct = styled.div`
    border-top: 1px solid rgb(235, 235, 240);
    padding-top: 10px;
    margin: 10px 0 20px;
`
