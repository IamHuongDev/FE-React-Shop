import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 500px;
    padding: 40px 45px 24px;
    background: rgb(255, 255, 255);
    border-radius: 20px 0px 0px 20px;
`
export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
    gap: 4px;
`
export const WrapperContainerRightText = styled.h4`
    margin: 10px 5px;
    color: rgb(11, 116, 229);
    font-size: 17px;
    font-weight: 500;
`
export const WrapperRightText = styled.span`
    color: rgb(13, 92, 182);
    font-size: 13px;
`
