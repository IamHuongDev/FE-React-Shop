import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
`
export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;
`
export const WrapperProductPage = styled(Row)`
    flex-wrap: nowrap; 
    padding-top: 10px;
`
