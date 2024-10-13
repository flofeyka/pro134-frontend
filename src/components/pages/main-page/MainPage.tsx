import {HeadSection} from "@comp/pages/main-page/sections/HeadSection";
import {AboutSection} from "@comp/pages/main-page/sections/AboutSection";
import {AdvantageSection} from "@comp/pages/main-page/sections/AdvantageSection";
import {ReviewSection} from "@comp/pages/main-page/sections/ReviewSection";
import {PopularSection} from "@comp/pages/main-page/sections/PopularSection";
import {FeedbackSection} from "@comp/pages/main-page/sections/FeedbackSection";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import Logo from "@img/PRO1000.svg";
import {MobileSwipe} from "@comp/common/mobile-swipe/MobileSwipe";
import {useNavLinks} from "@src/hooks/useNavLinks";
import {ReferenceSection} from "@comp/pages/main-page/sections/ReferenceSection";
import {useEffect} from "react";

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

export const MainPage = () => {
    const links = useNavLinks()
    const {hash} = useLocation()

    useEffect(() => {
        const anchors = ['#reviews', '#advantage', '#about', '#feedback']

        if (anchors.includes(hash)) {
            const element = document.querySelector(hash)
            element.scrollIntoView({behavior: "smooth"})
        }

    }, [hash]);

    return (
        <>
            <HeadSection/>
            <AboutSection/>
            <AdvantageSection/>
            <ReviewSection/>
            <PopularSection/>
            <FeedbackSection/>
            <Footer>
                <Wrapper>
                    <FooterContainer>
                        <Link to="/">
                            <Logo width="77" height="20"/>
                        </Link>

                        <HiddenHeader>
                            <Navigation>
                                {
                                    links.map((link, index) =>
                                        <Link key={index} to={link.to}>{link.title}</Link>)
                                }
                            </Navigation>
                        </HiddenHeader>
                    </FooterContainer>
                </Wrapper>
            </Footer>
            <ReferenceSection/>
        </>
    );
}