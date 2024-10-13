import {Portal} from "@comp/hoc/portal/Portal";
import styled from "styled-components";
import {DragEventHandler} from "react";
import {Modal} from "@comp/hoc/modal/Modal";

const MainContainer = styled.div`
    width: 687px;
    height: 399px;
    padding: 20px;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 343px);
    background-color: #FFF;
    border: 1px solid #00000033;
    border-radius: 10px;
    z-index: 99;
`

const Heading = styled.h2`
    font-family: var(--montserrat-bold);
    font-weight: 800;
    font-size: 50px;
    line-height: 61px;
    text-align: center;
    color: #202020;
    margin: 17px 0 20px 0;
`

const Dropzone = styled.div`
    height: 261px;
    background-color: #F5F5F5;
    border: 1px solid #0000001A;
    border-radius: 10px;
    line-height: 261px;
    text-align: center;
    font-family: var(--montserrat-regular);
    font-weight: 500;
    color: #202020;
`

const Background = styled.div`
    position: absolute;
    z-index: 98;
    background-color: #00000080;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    onDrop: DragEventHandler,
};

export const DropModal = (p: Props) => {
    const body = document.body

    body.ondragenter = (e: DragEvent) => {
        e.preventDefault()
        p.setOpen(true)
    }

    //отмена открытия файла
    body.ondragover = (e: DragEvent) => {
        e.preventDefault()
        p.setOpen(true)
    }

    body.ondragleave = (e: DragEvent) => {
        e.preventDefault()
        p.setOpen(false)
    }

    body.ondrop = (e: DragEvent) => {
        e.preventDefault()
        p.setOpen(false)
    }

    return (
        p.open &&
        <>
            <Modal>
                <MainContainer>
                    <Heading>Загрузить</Heading>
                    <Dropzone
                        onDrop={p.onDrop}
                    >Переместите изображение в эту область</Dropzone>
                </MainContainer>
            </Modal>
        </>
    );
};