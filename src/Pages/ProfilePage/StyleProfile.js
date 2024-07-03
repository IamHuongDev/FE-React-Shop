import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeaderProfile = styled.h1`
    font-size: 18px;
    margin: 4px 0;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 20px;
    gap: 10px;
`
export const WrapperLable = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-list .ant-upload-list-text {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-container {
        display: none;
    }
`