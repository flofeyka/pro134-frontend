import styled from "styled-components";
import Trash from "@img/Trash.svg";
import {Modal} from "@comp/hoc/modal/Modal";
import {IProduct} from "@src/types/Product";
import {authFetch} from "@src/lib/auth_fetch";

const MainContainer = styled.div`
    width: 687px;
    height: 191px;
    position: absolute;
    left: calc(50% - 343px);
    top: calc(50% - 95px);
    border-radius: 10px;
    border: 1px solid #00000033;
    background-color: #FFFFFF;
    padding: 40px;
    z-index: 99;
`

const Heading = styled.h2`
    font-family: var(--montserrat-bold);
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    margin-bottom: 20px;
`

const ButtonsBlock = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`

const DeleteButton = styled.button`
    border: 1px solid #FF0000;
    top: 118px;
    left: 223px;
    padding: 8px 20px 8px 20px;
    gap: 5px;
    border-radius: 23px;
    display: flex;
    justify-content: center;
    outline: none;
    background-color: transparent;

    span {
        color: #FF0000;
        font-family: var(--montserrat-regular);
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        text-align: left;
    }
`

const CancelButton = styled.button`
    top: 118px;
    left: 363px;
    padding: 8px 20px 8px 20px;
    gap: 5px;
    border-radius: 23px;
    font-family: var(--montserrat-regular);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    text-align: left;
    background-color: #0047FF;
    color: #FFFFFF;
    outline: none;
    border: 1px solid #0047FF;
`

type Props = {
    open: boolean,
    setOpen: (item: {
        product: IProduct,
        open: boolean
    }) => void,

    product?: IProduct,
    onDelete?: Function
};

export const DeleteProductModal = (p: Props) => {

    const onClick = async () => {
        const res = await authFetch(`/api/product/${p.product.id}`, {
            method: "DELETE"
        })
        if (res.ok) {
            p.setOpen({
                product: p.product,
                open: false,
            })
            p.onDelete()
        } else {
            console.log('error on deleting product')
        }
    }

    return (
        p.open &&
        <>
            <Modal>
                <MainContainer>
                    <Heading>Точно требуется удалить "{p.product ? p.product.model : ''}"</Heading>
                    <ButtonsBlock>
                        <DeleteButton
                            onClick={onClick}
                        >
                            <Trash/>
                            <span>Удалить</span>
                        </DeleteButton>

                        <CancelButton
                            onClick={() => {
                                p.setOpen({
                                    product: p.product,
                                    open: false,
                                })
                            }}
                        >Оставить</CancelButton>
                    </ButtonsBlock>
                </MainContainer>
            </Modal>
        </>
    );
};