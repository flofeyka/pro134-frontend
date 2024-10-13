import styled from "styled-components";
import {IOrder} from "@src/types/Order";

const MainContainer = styled.div`
    display: flex;
    gap: 5px;
`

const Image = styled.img`
    width: 100px;
    aspect-ratio: 1;
    border: 1px solid #0000001A;
    background: #FFFFFF;
    
    object-fit: contain;
    object-position: center;
    border-radius: 5px;
`

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`

const Param = styled.div`
    text-align: left;
    font-family: var(--montserrat-regular);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #000;

`

type Props = {
    imageSrc: string
    type: IOrder['type']
    title: string
    email: string
    phone: string
    address: string
}

export const AdminOrderItem = (p: Props) => {
    return (
        <>
            <MainContainer>
                <Image src={p.imageSrc}/>
                <TextBlock>
                    <Param>{p.type === 'PHYSICAL' ? 'ФИО: ' : 'ООО '} {p.title}</Param>
                    <Param>email: {p.email}</Param>
                    <Param>Телефон: {p.phone}</Param>
                    <Param>Место жительства: {p.address}</Param>
                </TextBlock>
            </MainContainer>
        </>
    );
};