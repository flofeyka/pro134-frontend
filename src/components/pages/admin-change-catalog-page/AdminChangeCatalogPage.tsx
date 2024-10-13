import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ChangeProductItem} from "@comp/pages/admin-change-catalog-page/common/ChangeProductItem";
import {AddProductItem} from "@comp/pages/admin-change-catalog-page/common/AddProductItem";
import {useEffect, useState} from "react";
import {IProduct} from "@src/types/Product";
import {DeleteProductModal} from "@comp/pages/admin-change-catalog-page/common/DeleteProductModal";
import {useProductsWithStopped} from "@src/hooks/useProductsWithStopped";
import {authFetch} from "@src/lib/auth_fetch";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 50px;
    line-height: 61px;
    color: #202020;
`

const HeadingWrap = styled.div`
    display: flex;
    gap: 36px;
    align-items: center;
    margin-bottom: 40px;
`

const Navigation = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;

    & a {
        font-family: var(--montserrat-extrabold);
        font-weight: 800;
        font-size: 16px;
        line-height: 20px;
        color: #0047FF;
        text-decoration: none;
    }
`

const MainContainer = styled.div`
    padding: 70px 0;
`

const ProductContainer = styled.div`
    display: grid;
    grid-gap: 10px 20px;
    grid-template-columns: repeat(4, 1fr);
`

export const AdminChangeCatalogPage = () => {

    const [products, setProducts] = useState<Array<IProduct>>([])
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean,
        product?: IProduct
    }>({open: false})

    useEffect(() => {
        useProductsWithStopped()
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);

    const deleteProduct = async (id: number) => {
        const currentProduct = products.find(p => p.id === id)
        setDeleteModal({
            open: true,
            product: currentProduct,
        })
    }
    const onDelete = () => {
        setProducts(products.filter(p => p.id !== deleteModal.product.id))
    }

    const stopProduct = async (id: number) => {
        const currentProduct = products.find((p) => p.id === id)

        const res = await authFetch(`/api/product/${id}/stop`, {
            method: "PUT",
            body: JSON.stringify({value: (!currentProduct.stopped).toString()}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {
            setProducts(products.map(p => {
                if (p.id === id) {
                    p.stopped = !p.stopped
                }
                return p
            }))
        }
    }



    return (
        <>
            <MainContainer>
                <Wrapper>
                    <HeadingWrap>
                        <Heading>Изменить каталог</Heading>
                        <Navigation>
                            <Link to="/admin/stat">Статистика</Link>
                        </Navigation>
                    </HeadingWrap>

                    <ProductContainer>
                        {products.map(p =>
                                <ChangeProductItem
                                    key={p.id}
                                    id={p.id}
                                    image={useProductImage(p)}
                                    title={p.model}
                                    deleteAction={() => deleteProduct(p.id)}
                                    stopAction={() => stopProduct(p.id)}
                                    stopped={p.stopped}
                                />
                        )}
                        <AddProductItem/>
                    </ProductContainer>

                </Wrapper>
            </MainContainer>
            <DeleteProductModal
                open={deleteModal.open}
                setOpen={setDeleteModal}
                product={deleteModal.product}
                onDelete={onDelete}
            />
        </>
    );
};