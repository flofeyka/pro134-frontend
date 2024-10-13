import {Link, NavLink, Outlet} from "react-router-dom";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import Logo from "@img/PRO1000.svg";
import Burger from "@img/burger.svg";
import {useNavLinks} from "@src/hooks/useNavLinks";
import {MobileSwipe} from "@comp/common/mobile-swipe/MobileSwipe";
import {useState} from "react";

const Header = styled.header`
    background-color: #101010;
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px auto;

    & svg path {
        fill: var(--white);
    }
    
    @media screen and (min-width: 900px) {
        justify-content: start;
        gap: 115px;
    }
`

const BurgerWrapper = styled.div`
    width: 24px;
    height: 16px;
    
    @container wrapper (min-width: 800px) {
        & {
            display: none;
        }
    }
`

const Footer = styled.footer`
    background-color: #101010;
`

const FooterContainer = styled.div`
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 900px) {
        justify-content: start;
        gap: 115px;
    }
    
    & svg path {
        fill: var(--white);
    }
`

const HiddenHeader = styled.div`
    @container wrapper (max-width: 800px) {
        & {
            display: none;
        }
    }

    & a {
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        font-family: var(--montserrat-regular);
        color: var(--white);
    }
`

const Navigation = styled.nav`
    display: flex;
    gap: 20px;
    
`

const Main = styled.main`
    min-height: calc(100vh - 203px);
`

export const MainLayout = () => {

    const links = useNavLinks()
    const [swipeMenu, setSwipeMenu] = useState(false)

    return (
        <>
            <Header>
                <Wrapper>
                    <HeaderWrapper>
                        <Link to="/">
                            <Logo width="77" height="20"/>
                        </Link>

                        <BurgerWrapper
                            onClick={() => setSwipeMenu(true)}
                        >
                            <Burger width="24" height="16"/>
                        </BurgerWrapper>

                        <HiddenHeader>
                            <Navigation>
                                {links.map((i, index) => <>
                                    <NavLink
                                        to={i.to}
                                        key={index}
                                        style={({isActive}) => {
                                            return {
                                                fontWeight: isActive ? '900' : '500',
                                                fontFamily: isActive ? 'var(--montserrat-bold)' : 'var(--montserrat-regular)'
                                            }
                                        }}

                                    >{i.title}</NavLink>
                                </>)}
                            </Navigation>
                        </HiddenHeader>
                    </HeaderWrapper>
                </Wrapper>
            </Header>
            <Main>
                <Outlet/>
            </Main>
            <Footer>
                <Wrapper>
                    <FooterContainer>
                        <Link to="/">
                            <Logo width="77" height="20"/>
                        </Link>

                        <HiddenHeader>
                            <Navigation>
                                {links.map((i, index) => <>
                                    <Link key={index} to={i.to}>{i.title}</Link>
                                </>)}
                            </Navigation>
                        </HiddenHeader>
                    </FooterContainer>
                </Wrapper>
            </Footer>
            <MobileSwipe open={swipeMenu} setOpen={setSwipeMenu}/>
        </>
    );
};