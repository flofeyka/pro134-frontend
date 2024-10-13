import styled from "styled-components";
import {CountableNumberInput} from "@comp/ui/number-input/CountableNumberInput";
import {ChangeEventHandler} from "react";
import {Link} from "react-router-dom";

const MainContainer = styled.div`
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    
    @media screen and (min-width: 800px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const HeadBlock = styled.div`
    display: flex;
    gap: 34px;
    align-items: center;
`

const ParamsBLock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 116px;
`

const Image = styled.img`
    width: 86px;
    height: 80px;
    border-radius: 8px;
    border: 1px solid #00000040;
    object-fit: contain;
    object-position: center;
`

const Heading = styled.h3`
    font-family: var(--montserrat-regular);
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #202020;
`

const PostHeadingPrice = styled.div`
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #202020;
`

const Price = styled.div`
    font-family: var(--montserrat-bold);
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    color: #202020;
`

type Props = {
    id: number,
    photo: string,
    title: string,
    price: number,
    count: number,
    setCount: (value: number) => void,
}

export const CartItem = (p: Props) => {
    return (
        <>
            <MainContainer>
                <HeadBlock>
                    <Link to={`/product/${p.id}`}>
                        <Image src={p.photo} alt={''}/>
                    </Link>
                    <div>
                        <Heading>{p.title}</Heading>
                        <PostHeadingPrice>{p.price}₽</PostHeadingPrice>
                    </div>
                </HeadBlock>
                <ParamsBLock>
                    <CountableNumberInput
                        onChange={e => p.setCount(+e.currentTarget.value)}
                        setCount={p.setCount}
                        value={p.count}
                    />
                    <Price>{p.price}₽</Price>
                </ParamsBLock>
            </MainContainer>
        </>
    );
};