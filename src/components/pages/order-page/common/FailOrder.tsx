import styled from "styled-components";
import Cross from '@img/Cross.svg'

const Round = styled.div`
    width: 210px;
    aspect-ratio: 1;
    background-color: #0047FF;
    border-radius: 50%;
    position: relative;
    animation: growMain 1s linear forwards;

    & svg {
        position: absolute;
        width: 121px;
        height: 91px;
        top: calc(50% - 45px);
        left: calc(50% - 60px);
        z-index: 2;
        animation: growMask 1s linear forwards;

        path {
            fill: #FFFFFF;
        }
    }

    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 274px;
        aspect-ratio: 1;
        background-color: #0047FF80;
        border-radius: 50%;
        left: calc((274px - 210px) / -2);
        top: calc((274px - 210px) / -2);
        z-index: 1;
        animation: growBefore 1.5s ease-in forwards;
    }

    &::after {
        position: absolute;
        content: '';
        display: block;
        width: 338px;
        aspect-ratio: 1;
        background-color: #0047FF40;
        border-radius: 50%;
        left: calc((338px - 210px) / -2);
        top: calc((338px - 210px) / -2);
        z-index: 1;
        animation: growAfter 1.7s ease-in forwards;
    }

    @keyframes growBefore {
        0% {
            left: calc(50% - 4px);
            top: calc(50% - 4px);
            width: 0;
        }
        100% {
            width: 274px;
            left: calc((274px - 210px) / -2);
            top: calc((274px - 210px) / -2);
        }
    }

    @keyframes growAfter {
        0% {
            left: calc(50% - 4px);
            top: calc(50% - 4px);
            width: 0;
        }
        100% {
            width: 338px;
            left: calc((338px - 210px) / -2);
            top: calc((338px - 210px) / -2);
        }
    }

    @keyframes growMain {
        0% {
            width: 0;
        }
        100% {
            width: 210px;
        }
    }
    
    @keyframes growMask {
        0% {
            width: 0;
            height: 0;
            top: 50%;
            left: 50%;
        }
        100% {
            width: 121px;
            height: 91px;
            top: calc(50% - 45px);
            left: calc(50% - 60px);
        }
    }
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 203px);
`

const Heading = styled.h2`
    font-family: var(--montserrat-bold);
    font-size: clamp(24px, 4vw, 50px);
    font-weight: 800;
    line-height: clamp(29px, 5vw, 61px);
    text-align: center;
    margin-top: 70px;
    color: #202020;
    animation: growFont 1.3s ease-in forwards;

    @keyframes growFont {
        0% {
            opacity: 0;
            font-size: 0;
        }
        100% {
            opacity: 1;
            font-size: clamp(24px, 4vw, 50px);
        }
    }
`

const Text = styled.div`
    font-family: var(--montserrat-regular);
    font-size: clamp(12px, 1.3vw, 20px);
    font-weight: 600;
    line-height: clamp(14px, 1.8vw, 24px);
    text-align: center;
    margin-top: 20px;
    color: #202020;
    animation: growText 1.3s ease-in forwards;

    @keyframes growText {
        0% {
            opacity: 0;
            font-size: 0;
            margin-top: -40px;
        }
        100% {
            opacity: 1;
            font-size: clamp(12px, 1.3vw, 20px);
            margin-top: 20px;
        }
    }
`

export const FailOrder = (p: {text:string}) => {
    return (
        <>
            <MainContainer>
                <Round>
                    <Cross/>
                </Round>
                <Heading>Произошла ошибка при оформлении заказа</Heading>
                <Text>{p.text}</Text>
            </MainContainer>
        </>
    );
};