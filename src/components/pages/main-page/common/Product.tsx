import React from "react";
import styled from "styled-components";

type Props = {
    title: string,
    photo: string,
    power: number,
    capacity: string,
    weight: string,
    height: number,
    width: number,
    length: number
};

const Container = styled.div`
    width: 100%;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
    overflow: hidden;
    background-color: #F5F5F5;
    box-shadow: 
            0 10px 16px 0 #0000000D,
            0 14px 29px 0 #0000000A,
            0 37px 40px 0 #00000008,
            0 84px 47px 0 #00000003;
    
`

const Image = styled.img`
    width: 100%;
    height: 148px;
    object-position: center;
    object-fit: contain;
    background-color: var(--white);
`

const Content = styled.div`
    padding: 15px 15px 20px 15px;
`

const Heading = styled.h3`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 14px;
    line-height: 17px;
    text-align: start;
    margin-bottom: 5px;
    text-decoration: none!important;
    color: #000;

`

const Param = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    text-decoration: none;
    color: #000;
    
    & > * {
        font-family: var(--montserrat-regular);
        font-size: 12px;
        line-height: 16px;
        text-decoration: none;
    }
    
    & > *:first-child {
        font-weight: 600;
    }

    & > *:last-child {
        font-weight: 500;
        text-align: right;
    }
`

const ParamWrapper: React.FC<{children: React.ReactNode, value: boolean}> = ({children, value}) => {
    return value ? <Param>{children}</Param> : null
}
 
export const Product: React.FC<Props> = (p) => {
    return (
        <>
            <Container>
                <Image src={p.photo} alt=""/>
                <Content>
                    <Heading>{p.title}</Heading>
                    <ParamWrapper value={!!p.power}>
                        <div>Мощность</div>
                        <div>{p.power} Ватт</div>
                    </ParamWrapper>
                    <ParamWrapper value={+p.capacity > 0}>
                        <div>Ёмкость аккумулятора</div>
                        <div>{p.capacity}</div>
                    </ParamWrapper>
                    <ParamWrapper value={!!p.weight}>
                        <div>Вес</div>
                        <div>{p.weight}</div>
                    </ParamWrapper>
                    <ParamWrapper value={(p.height + p.width + p.length) > 0}>
                        <div>Размер</div>
                        <div>{p.height}x{p.length}x{p.width} см</div>
                    </ParamWrapper>
                </Content>
            </Container>
        </>
    );
};