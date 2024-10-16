import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import { CartItem } from "./common/CartItem";
import { Button } from "@src/components/ui/button/Button";
import {useEffect, useState} from "react";
import {useProduct} from "@src/hooks/useProduct";
import {IProduct} from "@src/types/Product";
import {useNavigate} from "react-router-dom";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const MainContainer = styled.div`
    padding: 50px 0;
`

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #202020;
    margin-bottom: 30px;
`

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (min-width: 900px) {
        width: 67%;
    }
`

const PriceBlock = styled.div`
    padding: 15px 20px;
    background-color: #F5F5F5;
    border-radius: 10px;

    @media screen and (min-width: 900px) {
        background-color: transparent;
        width: 33%;
        padding: 0;
    }
    
`

const PriceBlockHeading = styled.div`
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    color: #000000BF;
    margin-bottom: 32px;
`

const PriceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    & > *:first-child {
        font-family: var(--montserrat-regular);
        font-weight: 500;
        font-size: clamp(12px, 2vw, 16px);
        line-height: 24px;
        color: #000000A6;
    }

    & > *:last-child {
        font-family: var(--montserrat-regular);
        font-weight: 500;
        font-size: clamp(12px, 2vw, 16px);
        line-height: 24px;
        color: #000000;
    }
`

const PriceLine = styled.hr`
    color: #00000026;
`

const OrderButton = styled.button`
    display: flex;
    width: 100%;
    border: none;
    border-radius: 23px;
    padding: 0;
    margin-top: 20px;
    
    & div {
        width: 100%;
    }
`

const MainFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    
    @media screen and (min-width: 900px) {
        flex-direction: row;
        align-items: start;
    }
`

export const CartPage = () => {
    const cartInitValue = (() => {
        const localCart = localStorage.getItem("cart");
        return localCart ? JSON.parse(localCart) : [];
    })()

    const [cart, setCart] = useState<Array<number>>(cartInitValue)
    const [products, setProducts] = useState<Array<IProduct>>([])

    const navigate = useNavigate()

    useEffect(() => {
        const listProducts: Array<IProduct> = []

        const promises = cart.map(i => {
            return  new Promise(async (resolve, reject) => {
                const res = await useProduct(i)
                if (!res.ok) {
                    reject()
                }
                const json = await res.json()

                if (json.photos.length < 0) {
                    json.photos.push({
                        product_id: json.id,
                        source: useProductImage(json),
                        id: 0
                    })
                }

                json.count = 1

                listProducts.push(json)
                resolve(true)
            })
        })

        Promise.all(promises).then(() => setProducts(listProducts))

    }, []);

    const onOrder = () => {
        const orderedProducts = products.filter(p => p.count > 0).map(p => {
            return {
                product_id: p.id,
                count: p.count
            }
        })
        sessionStorage.setItem('order', JSON.stringify(orderedProducts))
        navigate('/order')
    }

    return (
        <>
            <MainContainer>
                <Wrapper>
                    <Heading>Корзина</Heading>

                    <MainFlex>
                        <CartItems>
                            {products.map(i =>
                                <CartItem
                                    key={i.id}
                                    photo={useProductImage(i)}
                                    id={i.id}
                                    title={i.model}
                                    price={i.price}
                                    count={i.count}
                                    setCount={(value) => {
                                        const updatedProducts = products.map(p => {
                                            if (p.id === i.id) {
                                                p.count = value
                                            }
                                            return p
                                        })
                                        setProducts(updatedProducts)
                                    }}
                                />)
                            }
                        </CartItems>

                        <PriceBlock>
                            <PriceBlockHeading>Сумма заказа</PriceBlockHeading>

                            {
                                products.filter(p => p.count > 0).map(p =>
                                    <PriceItem>
                                        <div>{p.model}</div>
                                        <div>{p.count}x{p.price}₽</div>
                                    </PriceItem>
                                )
                            }

                            <PriceLine/>

                            <PriceItem>
                                <div>Итого</div>
                                <div>{products.reduce((sum: number, p) => sum + +p.price * p.count, 0)}₽</div>
                            </PriceItem>

                            <OrderButton
                                onClick={onOrder}
                            >
                                <Button text="Оформить заказ"/>
                            </OrderButton>

                        </PriceBlock>
                    </MainFlex>

                </Wrapper>
            </MainContainer>
        </>
    );
};