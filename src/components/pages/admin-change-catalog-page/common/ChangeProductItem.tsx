import styled from "styled-components";
import Pencil from "@img/Pencil.svg";
import Trash from "@img/Trash.svg";
import Pause from "@img/Pause.svg";
import Play from "@img/Play.svg";
import {Link, useNavigate} from "react-router-dom";

const MainContainer = styled.div`
    min-width: 250px;
    background-color: #F5F5F5;
    border: 1px solid #B8B8B8;
    box-shadow: 0 10px 16px 0 #0000000D,
    0 14px 29px 0 #0000000A,
    0 37px 40px 0 #00000008,
    0 84px 47px 0 #00000003;

    border-radius: 10px;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
    height: 148px;
    object-position: center;
    object-fit: contain;
    background-color: #FFFFFF;
`

const ContentBlock = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const Heading = styled.h3`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 14px;
    line-height: 17px;
    color: #202020;
    margin-bottom: 10px;
`

const Button = styled.button<{ $color: string }>`
    display: flex;
    align-items: center;
    border: 1px solid ${p => p.$color};
    color: ${p => p.$color};
    border-radius: 23px;
    padding: 10px 20px;
    gap: 5px;
    background-color: transparent;
    cursor: pointer;

    & svg path {
        fill: ${p => p.$color};
    }
`

const PlayButton = styled.button`
    display: flex;
    align-items: center;
    border: 1px solid #0047FF;
    background-color: #0047FF;
    color: #FFF;
    border-radius: 23px;
    padding: 10px 20px;
    gap: 5px;
    cursor: pointer;
`

type Props = {
    id: number,
    image: string,
    title: string,
    deleteAction: () => void,
    stopAction: () => void,
    stopped: boolean
}

export const ChangeProductItem = (p: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <MainContainer>
                <Link to={'/product/' + p.id}>
                    <Image src={p.image} alt=""/>
                </Link>
                <ContentBlock>
                    <Heading>{p.title}</Heading>
                    <Button
                        $color="#0047FF"
                        onClick={() => navigate(`/admin/product/${p.id}/edit`)}
                    >
                        <Pencil/>
                        <div>Изменить</div>
                    </Button>

                    <Button
                        $color="#FF0000"
                        onClick={() => p.deleteAction()}
                    >
                        <Trash/>
                        <div>Удалить</div>
                    </Button>

                    {
                        p.stopped ?
                            (
                                <PlayButton
                                    onClick={() => p.stopAction()}
                                >
                                    <Play/>
                                    <div>Включить</div>
                                </PlayButton>
                            ) :
                            (
                                <Button $color="#909090"
                                        onClick={() => p.stopAction()}
                                >
                                    <Pause/>
                                    <div>Остановить</div>
                                </Button>
                            )
                    }
                </ContentBlock>
            </MainContainer>
        </>
    );
};