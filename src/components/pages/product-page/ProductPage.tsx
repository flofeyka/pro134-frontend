import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import {Button} from "@comp/ui/button/Button";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IProduct} from "@src/types/Product";
import {Swiper, SwiperSlide} from "swiper/react";
import {useProduct} from "@src/hooks/useProduct";
import {NotFoundPage} from "@comp/pages/not-found-page/NotFoundPage";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const MainContainer = styled.div`
    padding: 50px 0 60px 0;
`

const PresentBlock = styled.div`
    align-self: center;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 900px) {
        flex-direction: column-reverse;
        align-self: auto;
    }
`

const CurrentImage = styled.img`
    width: clamp(340px, 40vw, 690px);
    aspect-ratio: 520 / 293;
    border-radius: 25px;
    border: 1px solid #00000040;
    object-position: center;
    object-fit: contain;
    margin-bottom: 10px;
    transition: .3s ease;
`
const ImageContainer = styled.div`
    width: clamp(340px, 40vw, 690px);
    overflow: hidden;
`

const AllImages = styled.div`
    overflow: hidden;
    .swiper-slide {
        width: auto !important;
        margin-right: 20px;
    }

    .swiper {
        margin: 0;
    }
`

const ImageItem = styled.img<{ $current?: boolean }>`
    width: clamp(160px, 12vw, 212px);
    height: clamp(128px, 9.5vw, 169px);
    object-position: center;
    object-fit: contain;
    border: 1px solid #00000040;
    border-radius: 10px;
    opacity: ${p => p.$current ? 1 : 0.5};
    transition: .3s ease;
`

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    color: #202020;
    margin: 10px 0;
`

const PriceBlock = styled.div`
    width: clamp(340px, 30vw, 548px);
    padding: 30px 22px;
    background-color: #F5F5F5;
    border: 1px solid #B8B8B8;
    box-shadow: 0 10px 16px 0 #0000000D,
    0 14px 29px 0 #0000000A,
    0 37px 40px 0 #00000008,
    0 84px 47px 0 #00000003;

    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
    align-self: center;

    @media screen and (min-width: 900px) {
        order: 9;
        align-self: auto;
    }
`

const Price = styled.div`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 32px;
    line-height: 39px;
    color: #202020;
    text-align: center;
`

const ParamsBlock = styled.div`
    @media screen and (min-width: 900px) {
        width: min(27vw, 406px);
    }
`

const Param = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > *:first-child {
        font-family: var(--montserrat-regular);
        font-size: clamp(14px, 1vw, 16px);
        line-height: 16px;
        font-weight: 600;
        width: 37%;
    }

    & > *:last-child {
        font-family: var(--montserrat-regular);
        font-size: clamp(12px, 1vw, 16px);
        line-height: 16px;
        font-weight: 500;
        text-align: right;
    }

    margin-bottom: 5px;
`

const MainFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(10px, 2vw, 20px);

    @media screen and (min-width: 900px) {
        flex-direction: row;
        align-items: start;
    }
`

const HeadingBlock = styled.div`
    @media screen and (min-width: 900px) {
        display: none;
    }
`

const HiddenHeading = styled.div`
    font-weight: 800;
    font-family: var(--montserrat-extrabold);
    font-size: 32px;
    line-height: 39px;
    color: #202020;
    margin-bottom: 20px;
    display: none;

    @media screen and (min-width: 900px) {
        display: block;
    }
`

const ButtonsContainer = styled.div`
    max-width: 207px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > * > * {
        font-size: 16px;
        line-height: 20px;
        padding: 13px 35px;
    }

    & > button {
        padding: 0;
    }
`

const HiddenParams = styled.div<{ $open?: boolean }>`
    display: ${p => p.$open ? 'block' : 'none'};
`

const HiddenParamsContainer = styled.div`
    transition: all 0.3s ease;

`

const SeeMoreParamsBlock = styled.div<{ $open?: boolean }>`
    display: ${p => p.$open ? 'none' : 'flex'};
    margin: 10px auto 0 auto;
    justify-content: center;
`

const SeeMoreParams = styled.div`
    cursor: pointer;
    font-family: var(--montserrat-regular);
    color: #0047FF;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
`

const CartButton = styled.button`
    border: none;
    border-radius: 23px;

    & > * {
        width: 100%;
        height: 100%;
    }
`

const OrderButton = styled.button`
    border: none;
    border-radius: 23px;

    & > * {
        width: 100%;
        height: 100%;
    }
`

export const ProductPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] =
        useState<IProduct | null>(null)

    useEffect(() => {
        const init = async () => {
            const res = await useProduct(+id)
            if (res.status === 404) {
                navigate('/not-found')
            }
            const json = await res.json()
            if (json.photos.length < 1) {
                json.photos.push({
                    product_id: +id,
                    source: useProductImage(json),
                    id: 0
                })
            }
            setProduct(json)
        }
        init()

    }, []);

    const [moreParams, setMoreParams] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)
    const localCart = localStorage.getItem('cart')
    const parsedCart = localCart ? JSON.parse(localCart) : []
    const [cart, setCart] = useState<Array<number>>(parsedCart)

    const toggleCart = () => {
        const productId = +id
        let newCart: Array<number>
        if (cart.includes(productId)) {
            newCart = cart.filter((i) => i !== productId)
        } else {
            newCart = cart.concat(productId)
        }
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    }

    const orderAction = () => {
        if (!cart.includes(+id)) {
            localStorage.setItem('cart', JSON.stringify(cart.concat(+id)))
        }
        navigate('/cart')
    }

    return (
        <>
            <MainContainer>
                <Wrapper>
                    <HiddenHeading>{product?.model}</HiddenHeading>
                    <MainFlex>
                        <PresentBlock>
                            <ImageContainer>
                                <CurrentImage
                                    src={
                                    product ?
                                        product.photos[0].id === 0 ?
                                            product.photos[0].source :
                                            '/api/public/' + product.photos[currentImage].source: ''
                                    }
                                />
                                <AllImages>
                                    <Swiper
                                        slidesPerView="auto"
                                    >
                                        {product?.photos.map((photo, i: number) =>
                                            <SwiperSlide>
                                                <ImageItem
                                                    onClick={() => setCurrentImage(i)}
                                                    $current={currentImage === i}
                                                    src={photo.id === 0 ? photo.source : '/api/public/' + photo.source}
                                                    key={photo.id}
                                                />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </AllImages>
                            </ImageContainer>
                        </PresentBlock>
                        <HeadingBlock>
                            <Heading>{product?.model}</Heading>
                        </HeadingBlock>
                        <PriceBlock>
                            <Price>{product?.price}₽</Price>

                            <ButtonsContainer>
                                <CartButton
                                    onClick={toggleCart}
                                >
                                    <Button
                                        invert
                                        text={cart.includes(+id) ? 'В корзине' : 'В корзину'}
                                    />
                                </CartButton>

                                <OrderButton
                                    onClick={orderAction}
                                >
                                    <Button text={'Оформить заказ'}/>
                                </OrderButton>
                            </ButtonsContainer>

                        </PriceBlock>

                        <ParamsBlock>
                            <Param>
                                <div>Модель</div>
                                <div>{product?.model}</div>
                            </Param>
                            <Param>
                                <div>Емкость батареи</div>
                                <div>{product?.capacity}</div>
                            </Param>
                            <Param>
                                <div>Номинальная мощность</div>
                                <div>{product?.rated_power} Вт</div>
                            </Param>
                            <Param>
                                <div>Пиковая мощность</div>
                                <div>{product?.peak_power} Вт</div>
                            </Param>
                            <Param>
                                <div>Тип батареи</div>
                                <div>{product?.battery_type}</div>
                            </Param>
                            <Param>
                                <div>Адаптер</div>
                                <div>{product?.adapter}</div>
                            </Param>
                            <Param>
                                <div>Вход для зарядки авто</div>
                                <div>{product?.car_charge_input}</div>
                            </Param>
                            <Param>
                                <div>Солнечная зарядка</div>
                                <div>{product?.sun_charge}</div>
                            </Param>
                            <Param>
                                <div>Рабочая температура</div>
                                <div>{product?.work_temp}</div>
                            </Param>
                            <HiddenParamsContainer>
                                <HiddenParams $open={moreParams}>
                                    <Param>
                                        <div>Выход переменного тока</div>
                                        <div>{product?.ac_output}</div>
                                    </Param>
                                    <Param>
                                        <div>USB-выход</div>
                                        <div>{product?.usb_output}</div>
                                    </Param>
                                    <Param>
                                        <div>Выход</div>
                                        <div>{product?.output}</div>
                                    </Param>
                                    <Param>
                                        <div>Выход постоянного тока</div>
                                        <div>{product?.dc_output}</div>
                                    </Param>
                                    <Param>
                                        <div>Выход type-c</div>
                                        <div>{product?.type_c_output}</div>
                                    </Param>
                                    <Param>
                                        <div>Выходной сигнал</div>
                                        <div>{product?.output_signal}</div>
                                    </Param>
                                    <Param>
                                        <div>Вес брутто</div>
                                        <div>{product?.gross_weight}</div>
                                    </Param>
                                    <Param>
                                        <div>Размер</div>
                                        <div>{product?.height}х{product?.width}х{product?.length}</div>
                                    </Param>
                                </HiddenParams>
                                <SeeMoreParamsBlock $open={moreParams}>
                                    <SeeMoreParams onClick={() => setMoreParams(true)}>Смотреть далее</SeeMoreParams>
                                </SeeMoreParamsBlock>
                            </HiddenParamsContainer>
                        </ParamsBlock>
                    </MainFlex>
                </Wrapper>
            </MainContainer>
        </>
    );
};