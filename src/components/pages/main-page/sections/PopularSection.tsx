import styled from "styled-components";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {Product} from "@comp/pages/main-page/common/Product";
import {Button} from "@comp/ui/button/Button";
import {useEffect, useState} from "react";
import {IProduct} from "@src/types/Product";
import {Link} from "react-router-dom";
import {usePopularProducts} from "@src/hooks/usePopularProducts";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const Section = styled.section`
    padding: 50px 0;
`

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-size: clamp(24px, 4vw, 50px);
    font-weight: 800;
    line-height: clamp(29px, 5vw, 61px);
    text-align: center;
    margin-bottom: 50px;

    @media screen and (min-width: 900px) {
        text-align: start;
    }
`

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

const ProductContainer = styled.div`
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 40px;

    grid-template-columns: 1fr;
    
    @media screen and (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

export const PopularSection = () => {

    const [products, setProducts] = useState<Array<IProduct>>([])

    useEffect(() => {
        (async () => {
            const res = await usePopularProducts()
            const p = await res.json()
            setProducts(p)
        })()
    }, []);

    return (
        <>
            <Section>
                <Wrapper>
                    <Heading>Популярные товары</Heading>
                    <ProductContainer>
                        {
                            products.map(p =>
                                <Link
                                    to={'/product/' + p.id}
                                    key={p.id}
                                    style={{textDecoration: 'none'}}
                                >
                                    <Product
                                        title={p.model}
                                        photo={useProductImage(p)}
                                        power={+p.rated_power}
                                        capacity={p.capacity}
                                        weight={p.gross_weight}
                                        height={+p.height}
                                        length={+p.length}
                                        width={+p.width}
                                    />
                                </Link>
                            )
                        }
                    </ProductContainer>
                    <ButtonContainer>
                        <Link to={'catalog'}>
                            <Button text={'Смотреть далее'}/>
                        </Link>
                    </ButtonContainer>
                </Wrapper>
            </Section>
        </>
    );
};