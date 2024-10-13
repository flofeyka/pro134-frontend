import styled from "styled-components";
import Logo from "@img/PRO1000.svg";
import Burger from "@img/burger.svg";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {Button} from "@comp/ui/button/Button";
import BackgroundImage from "@img/header_back.png"
import HeaderImage from "@img/header_image.png"
import {NavLink, useNavigate} from "react-router-dom";
import {MobileSwipe} from "@comp/common/mobile-swipe/MobileSwipe";
import {useState} from "react";
import {useNavLinks} from "@src/hooks/useNavLinks";
import Lines from "@img/Lines.svg";

const Mobile = styled.div`
    display: block;

    @media screen and (min-width: 900px) {
        display: none;
    }
`

const FirstBack = styled.div`
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    background-size: cover;

`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
`

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 900;
    text-align: center;
    padding-top: 74px;

    & > *:first-child {
        line-height: 40px;
        font-size: 32px;
        background: linear-gradient(180deg, #202020 0%, #111111 100%);
        -webkit-background-clip: text;
    }

    & > *:last-child {
        line-height: 30px;
        font-size: 25px;

        span {
            color: #0047FF;
        }
    }
`

const MobileHeader = styled.div`
    padding-bottom: 74px;
`

const SalesHeading = styled.h2`
    line-height: 15px;
    font-family: var(--montserrat-extrabold);
    font-weight: 900;
    font-size: 12px;
    background: linear-gradient(180deg, #202020 0%, #111111 100%);
    -webkit-background-clip: text;
    margin: 15px 0 5px 0;
    text-align: center;
`

const SalesText = styled.div`
    text-align: center;
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
`

const ButtonBlock = styled.div`
    width: 205px;
    margin: 15px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;

    & > * {
        flex-shrink: 0;
    }
    
    & > :last-child * {
        background-color: transparent;
    }
`

const SecondBack = styled.div`
    background: linear-gradient(180deg, #151515 0%, #101010 100%);
    height: 283px;
    position: relative;
    overflow: hidden;

    svg {
        position: absolute;
        right: -400px;
        top: -300px;
        transform: rotate(-45deg);

        path {
            stroke: #FFFFFF;
        }
    }
`

const MobileHeaderImage = styled.img`
    position: absolute;
    object-fit: cover;
    object-position: center;
    width: 341px;
    height: 263px;
    top: 10px;
    left: calc(50% - 170px);
    border-radius: 25px;
    border: 1px solid #999999;
    display: block;
`

const Desktop = styled.div`
    position: relative;
    display: none;
    overflow: hidden;
    background: url("${BackgroundImage}"), linear-gradient(180deg, #151515 0%, #101010 100%);
    background-size: 70%, 30%;
    background-repeat: no-repeat, no-repeat;
    background-position: left, right;

    @media screen and (min-width: 900px) {
        display: block;
    }

    & > :first-child {
        width: 808px;
        height: 761px;
        position: absolute;
        bottom: 3vw;
        right: -200px;
        transform: rotate(-140deg);

        path {
            stroke: #FFFFFF;
        }
    }
`

const DesktopHeader = styled.header`
    display: flex;
    align-items: center;
    gap: clamp(50px, 7vw, 115px);
    padding: 40px 0;

    & svg path {
        fill: #18181b;
    }
`

const Navigation = styled.nav`
    display: flex;
    align-items: center;
    gap: clamp(10px, 1.5vw, 20px);

    & > :where(a:link, a:active, a:hover, a:visited) {
        font-family: var(--montserrat-regular);
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #202020;
        text-decoration: none;
        //filter: invert(1);
        mix-blend-mode: difference;
    }
`

const DesktopFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 80px 100px 160px 0;
    position: relative;
`

const DesktopFirstBlock = styled.div`
    width: 64%;
`

const DesktopSecondBlock = styled.img`
    width: min(42%, 690px);
    aspect-ratio: 690 / 774;
    object-fit: cover;
    object-position: center;
    border: 1px solid #999999;
    border-radius: 25px;
`

const DesktopHeading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 900;
    font-size: clamp(30px, 4vw, 50px);
    line-height: clamp(40px, 5vw, 61px);
`

const DesktopSalesHeading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-weight: 900;
    font-size: 16px;
    line-height: 20px;
    margin: 20px 0 10px 0;
`

const DesktopSalesText = styled.div`
    font-family: var(--montserrat-regular);
    font-size: clamp(12px, 1.5vw, 16px);
    line-height: clamp(16px, 2vw, 20px);
    font-weight: 500;
`

const DesktopButtonsBlock = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;

    & > * {
        flex-shrink: 0;
    }
    
    & > :last-child * {
        background-color: transparent;
    }
`


export const HeadSection = () => {
    const navigate = useNavigate()
    const links = useNavLinks()
    const [swipeMenu, setSwipeMenu] = useState<boolean>(false)

    return (
        <>
            <Mobile>
                <FirstBack>
                    <Wrapper>
                        <MobileHeader>
                            <Header>
                                <Logo width="77" height="20"/>
                                <div
                                    onClick={() => setSwipeMenu(true)}
                                >
                                    <Burger width="24" height="16"/>
                                </div>
                            </Header>

                            <Heading>
                                <div>Электростанции -</div>
                                <div><span>надежные </span> решения</div>
                            </Heading>

                            <SalesHeading>Что мы продаем?</SalesHeading>
                            <SalesText>
                                В вашем распоряжении23232 - портативные электростанции, которые подарят вам свободу
                                и независимость от централизированного электросбережения.<br/>
                                На нашем сайте вы найдете широкий выбор моделей, идеально подходящих для различных задач
                            </SalesText>

                            <ButtonBlock>
                                <div onClick={() => navigate('/catalog')}>
                                    <Button text="Смотреть каталог"/>
                                </div>
                                <div onClick={() => navigate('/#feedback')}>
                                    <Button invert text="Связаться с нами"/>
                                </div>
                            </ButtonBlock>
                        </MobileHeader>
                    </Wrapper>
                </FirstBack>

                <SecondBack>
                    <Lines width="808" height="761"/>
                    <MobileHeaderImage src={HeaderImage} alt=""/>
                </SecondBack>
            </Mobile>
            <Desktop>
                <Lines/>

                <Wrapper>
                    <DesktopHeader>
                        <Logo width="77" height="20"/>
                        <Navigation>
                            {
                                links.map((link, index) =>
                                    <NavLink key={index} to={link.to}>{link.title}</NavLink>)
                            }
                        </Navigation>
                    </DesktopHeader>

                    <DesktopFlex>
                        <DesktopFirstBlock>
                            <DesktopHeading>Электростанции -<br/>
                                <span style={{color: 'var(--blue)'}}> надежные</span> решения
                            </DesktopHeading>

                            <DesktopSalesHeading>Что мы продаем?</DesktopSalesHeading>
                            <DesktopSalesText>В вашем распоряжении - портативные электростанции, которые подарят вам
                                свободу
                                и независимость от централизированного электросбережения.
                                <br/>
                                <br/>
                                На нашем сайте вы найдете широкий выбор моделей, идеально подходящих для
                                различных задач</DesktopSalesText>

                            <DesktopButtonsBlock>
                                <div onClick={() => navigate('/catalog')}>
                                    <Button text="Смотреть каталог"/>
                                </div>
                                <div onClick={() => navigate('/#feedback')}>
                                    <Button invert text="Связаться с нами"/>
                                </div>
                            </DesktopButtonsBlock>

                        </DesktopFirstBlock>

                        <DesktopSecondBlock src={HeaderImage}/>
                    </DesktopFlex>
                </Wrapper>
            </Desktop>
            <MobileSwipe open={swipeMenu} setOpen={setSwipeMenu}/>
        </>
    );
};