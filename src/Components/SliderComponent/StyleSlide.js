import { Slider } from "antd";
import styled from "styled-components";

export const WrapperSlideStyle = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 12px;
        z-index: 10;
        top: 50%;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-arrow.slick-next { 
        right: 28px;
        z-index: 10;
        top: 50%;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: rgb(255, 255, 0.5);
                }
            }
            
        }
        li.active {
            button {
                &::before {
                    color: #fff;
                }
            }
        }
    } 
`