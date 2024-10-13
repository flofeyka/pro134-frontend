import styled from "styled-components";
import SovaSrc from "@img/Sova.png";

const Mobile = styled.div`
    @media screen and (min-width: 900px) {
        display: none;
    }
    
    padding: 8px 18px 18px 18px;
    background-color: #5E2E82;
    
    & > :nth-child(2) {
        margin: 8px 0 30px 0;
    }
`

const Desktop = styled.div`
    display: none;
    background-color: #5E2E82;
    align-items: center;
    justify-content: space-between;
    padding-right: 49px;
    
    @media screen and (min-width: 900px) {
        display: flex;
    }
`

const LogoBlock = styled.a`
    display: flex;
    align-items: center;
`

const LogoTitle = styled.div`
    font-family: var(--montserrat-bold);
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #FFFFFF;
`

const Logo = styled.img`
    object-fit: contain;
    object-position: center;
    width: 49px;
    aspect-ratio: 1;
`

const DesktopFlexItem = styled.div`
    font-family: var(--montserrat-bold);
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-align: left;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 20px;
    
    a {
        text-decoration: none;
        color: #FFFFFF;
    }
`

export const ReferenceSection = () => {
    return (
        <>
            <Mobile>
                <LogoBlock href="https://vk.com/studiosova">
                    <Logo src={SovaSrc} />
                    <LogoTitle>СОВА</LogoTitle>
                </LogoBlock>
                <DesktopFlexItem>
                    <a href="https://vk.com/studiosova">Сайт разработан IT-студией “СОВА”</a>
                </DesktopFlexItem>
                <DesktopFlexItem>
                    <a href="mailto:studio-sova@inbox.ru">studio-sova@inbox.ru</a>
                    <a href="tel:+79170968750">+7 (917)-096-87-50</a>
                </DesktopFlexItem>
            </Mobile>
            <Desktop>
                <LogoBlock href="https://vk.com/studiosova">
                    <Logo src={SovaSrc} />
                    <LogoTitle>СОВА</LogoTitle>
                </LogoBlock>

                <DesktopFlexItem>
                    <a href="https://vk.com/studiosova">Сайт разработан IT-студией “СОВА”</a>
                </DesktopFlexItem>
                <DesktopFlexItem>
                    <a href="mailto:studio-sova@inbox.ru">studio-sova@inbox.ru</a>
                    <a href="tel:+79170968750">+7 (917)-096-87-50</a>
                </DesktopFlexItem>
                

            </Desktop>
        </>
    );
};