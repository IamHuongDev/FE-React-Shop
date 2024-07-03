import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";

export const WrapperTyperProductItem = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        background-color: rgb(13, 92, 182);
        
        span {
            color: #fff;
        }
    }
`

export const WrapperProduct = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
`
