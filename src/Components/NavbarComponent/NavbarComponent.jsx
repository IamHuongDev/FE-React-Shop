import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './StyleNavbar'
import { Checkbox, Col, Rate, Row } from 'antd'
 
const NavbarComponent = () => {
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })           
            case 'checkbox':
                return (
                    <Checkbox.Group
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                    onChange={onChange}
                  >     
                  {options.map((option) => {
                    return (
                        <Checkbox value={option.value}>{option.label}</Checkbox> 
                    )
                  })}                                
                  </Checkbox.Group>
                )   
            case 'star':
                return options.map((option) => {
                        return (
                           <div style={{ display: 'flex', alignItems: 'center'}}>
                             <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                             <span style={{marginLeft: '8px'}}>{` chỉ từ ${option} sao`}</span>
                           </div>
                        )
                  })                                                      
            case 'price':
                return options.map((option) => {
                        return (
                           <WrapperTextPrice><span style={{margin: '5px'}}>{option}</span></WrapperTextPrice>
                        )
                  })                                                      
            default:
                return {}
        }
    }
  return (
//    <div style={{backgroundColor: "#fff"}}>
    <div>
    <WrapperLableText>Lable</WrapperLableText>
    <WrapperContent>
        {renderContent('text', ['Tủ lạnh', 'TiVi', 'Điện thoại'])}
    </WrapperContent>
    {/* <WrapperContent>
    {renderContent('checkbox', [
            {
                value: 'A',
                label: 'A'
            },
            {
                value: 'B',
                label: 'B'
            }          
            ])
    }
    </WrapperContent>
    <WrapperContent>
    {renderContent('star', [3,4,5])}
    </WrapperContent>
    <WrapperContent>
    {renderContent('price', ['dưới 400.000','trên 900.000'])}
    </WrapperContent> */}
   </div>
  )
}

export default NavbarComponent 