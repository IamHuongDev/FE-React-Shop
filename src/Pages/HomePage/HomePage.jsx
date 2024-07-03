import React from 'react';
import TypeProduct from '../../Components/TypeProduct/TypeProduct';
import {
  WrapperButtonMore,
  WrapperProduct,
  WrapperTyperProductItem,
} from './StyleHomePage';
import SliderComponent from '../../Components/SliderComponent/SliderComponent';
import slide1 from '../../assets/images/slide1.png';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import slide5 from '../../assets/images/slide5.jpg';
import slide6 from '../../assets/images/slide6.jpg';
import CardComponent from '../../Components/CardComponent/CardComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../Service/ProductService';

const Homepage = () => {
  const arr = ['TV', 'Điện Thoại', 'Quần áo', 'Đồng hồ'];

  const fetchProductApi = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { isLoading, data: product } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductApi,
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTyperProductItem>
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTyperProductItem>
      </div>

      <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
        <div id="container" style={{ margin: '0 auto', height: '1000px', width: '1270px' }}>
          <SliderComponent arrImages={[slide1, slide2, slide3, slide4, slide5, slide6]} />

          <WrapperProduct>
            {product?.data?.map((item) => (
              <CardComponent
                key={item._id}
                countInStock={item.countInStock}
                description={item.description}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rating}
                type={item.type}
                discount={item.discount}
                sale={item.sale}
              />
            ))}
          </WrapperProduct>

          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <ButtonComponent
              textButton="Xem thêm"
              type="outline"
              style={{
                border: '1px solid rgb(11, 116, 229)',
                color: 'rgb(11, 116, 229)',
                height: '38px',
                width: '240px',
                borderRadius: '5px',
                fontWeight: '500',
              }}
            />
          </div>

          {/* <NavbarComponent /> */}
        </div>
      </div>
    </>
  );
};

export default Homepage;
