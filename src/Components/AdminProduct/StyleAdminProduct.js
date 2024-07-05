import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
   color: #000;
   font-size: 14px;
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