import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import FilterIcon from "@img/Filter.svg";
import {Product} from "@comp/pages/main-page/common/Product";
import {CSSProperties, useEffect, useState} from "react";
import {Checkbox} from "@comp/ui/checkbox/Checkbox";
import {Transition} from "react-transition-group";
import {Link} from "react-router-dom";
import {IProduct} from "@src/types/Product";
import {useProducts} from "@src/hooks/useProducts";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const Filters = styled.div`
    padding: 20px;
    
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (min-width: 800px) {
        & {
            padding: 0;
            align-items: start;
        }
    }
`


const FilterModal = styled.div`
    display: none;
    border: 1px solid #00000040;
    background-color: #F5F5F5;
    border-radius: 10px;
    box-shadow: 0 7px 15px 0 #0000001A,
    0 27px 27px 0 #00000017,
    0 61px 37px 0 #0000000D,
    0 108px 43px 0 #00000003,
    0 169px 47px 0 #00000000;
    position: absolute;
    right: 0;
    
    opacity: 0;
    transition: 0.2s ease-in-out;
`

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: clamp(24px, 4vw, 50px);
    line-height: clamp(30px, 4.2vw, 61px);
    color: #202020;
`

const HeadingBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`

const MainContainer = styled.div`
    padding: 50px 0;
`

const FilterIconContainer = styled.div`
    cursor: pointer;
    position: relative;

    @media screen and (min-width: 800px) {
        & {
            display: none;
        }
    }
`

const ProductContainer = styled.div`
    display: grid;
    grid-gap: 40px 20px;
    
    @media screen and (min-width: 800px) {
        & {
            grid-template-columns: repeat(2 , 1fr);
        }
    }

    @media screen and (min-width: 1100px) {
        & {
            grid-template-columns: repeat(3 , 1fr);
        }
    }
`

const MainFlex = styled.div`
    display: flex;
    align-items: start;
    gap: 130px;
`

const CategoriesHeading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    color: #202020;
    margin-bottom: 10px;
`

const Aside = styled.aside`
    display: none;
    
    @media screen and (min-width: 800px) {
        & {
            display: block;
        }
    }
`

const Content = styled.div`
    flex-basis: 100%;
`

const FadeStyles: Record<string, CSSProperties> = {
    entering: {
        display: 'block',
        opacity: 0
    },
    entered: {
        display: 'block',
        opacity: 1
    },
    exiting: {
        display: 'block',
        opacity: 1
    },
    exited: {
        display: 'none',
        opacity: 0
    }
}

export const CatalogPage = () => {

    const [filterModal, setFilterModal] = useState<boolean>(false)
    const [products, setProducts] = useState<Array<IProduct>>([])
    const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>([])

    const [filters, setFilters] = useState<
        Record<number, boolean>
    >({
        600: false,
        1200: false,
        1800: false,
        1000: false,
        1500: false,
        2400: false,
        2500: false,
        3600: false,
        5000: false,
    })

    useEffect(() => {
        useProducts()
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const currentFilters = Object.entries(filters)
            .filter(([, value]) => value)
            .map(([key]) => +key)

        setFilteredProducts(products.filter(p => currentFilters.includes(p.rated_power)))
    }, [filters]);

    const renderedProducts = (() => {
        const currentFilters = Object.entries(filters)
            .filter(([, value]) => value)
            .map(([key]) => +key)

        if (currentFilters.length > 0) {
            return products.filter(p => currentFilters.includes(p.rated_power))
        }
        return products
    })()

    return (
        <>
            <MainContainer>
                <Wrapper>
                    <MainFlex>
                        <Aside>
                            <CategoriesHeading>Категории</CategoriesHeading>

                            <Filters>
                                {
                                    Object.keys(filters).map((item, index) =>
                                        <Checkbox
                                            invert
                                            labelText={`${item} Ватт`}
                                            key={index}
                                            checked={filters[+item]}
                                            setChecked={e => setFilters({
                                                ...filters,
                                                [+item]: e.currentTarget.checked
                                            })}
                                        />
                                    )
                                }
                            </Filters>
                        </Aside>
                        <Content>
                            <HeadingBlock>
                                <Heading>Каталог</Heading>
                                <FilterIconContainer>
                                    <FilterIcon width="16" height="18" onClick={() => setFilterModal(!filterModal)}/>
                                    <Transition in={filterModal} timeout={100} >
                                        {status => (
                                            <FilterModal style={{ ...FadeStyles[status] }} >
                                                <Filters>
                                                    {
                                                        Object.keys(filters).map((item, index) =>
                                                            <Checkbox
                                                                labelText={`${item} Ватт`}
                                                                key={index}
                                                                checked={filters[+item]}
                                                                setChecked={e => setFilters({
                                                                    ...filters,
                                                                    [+item]: e.currentTarget.checked
                                                                })}
                                                            />
                                                        )
                                                    }
                                                </Filters>
                                            </FilterModal>
                                        )}
                                    </Transition>
                                </FilterIconContainer>
                            </HeadingBlock>

                            <ProductContainer>
                                {
                                    renderedProducts.map(i =>
                                    <Link
                                        to={'/product/' + i.id}
                                        style={{textDecoration: 'none'}}
                                    >
                                        <Product
                                            title={i.model}
                                            photo={useProductImage(i)}
                                            power={+i.rated_power}
                                            capacity={i.capacity}
                                            weight={i.gross_weight}
                                            height={+i.height}
                                            length={+i.length}
                                            width={+i.width}
                                        />
                                    </Link>
                                )}
                            </ProductContainer>
                        </Content>
                    </MainFlex>

                </Wrapper>
            </MainContainer>
        </>
    );
};