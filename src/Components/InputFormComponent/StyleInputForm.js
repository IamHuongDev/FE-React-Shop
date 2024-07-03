import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-left: none;
    border-top: none;
    border-right: none;
    outline: none;
    box-shadow: none !important;
    &:focus{
        background-color: rgb(232, 240, 254);
    }
`