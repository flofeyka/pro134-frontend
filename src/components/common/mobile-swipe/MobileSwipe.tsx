import {useNavLinks} from "@src/hooks/useNavLinks";
import styled from "styled-components";
import Logo from "@img/PRO1000.svg";
import Cross from "@img/Cross.svg";
import Lines from "@img/Lines.svg";
import BlueLines from "@img/BlueLines.svg";
import {Link} from "react-router-dom";

const MainContainer = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: #FFF;

    @media screen and (min-width: 900px) {
        display: none;
    }
`

const HeadingBlock = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px 18px 0 18px;
    
    & > * {
      cursor: pointer;  
    }
`

const LinksBlock = styled.div`
    width: 100%;
    height: calc(100vh - 20px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: right;
    gap: 30px;
    z-index: 2;
    top: 30px;
    right: 18px;
    position: absolute;
    
    & > * {
        color: #202020;
        text-decoration: none;
        font-family: var(--montserrat-regular);
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
    }
`

const RelativeContainer = styled.div`
    position: relative;
    padding: 30px 18px;
    width: 100%;
    height: 100%;
    
    & > :nth-child(2) {
        position: absolute;
        bottom: 0;
        right: -100px;
        z-index: auto;
    }
    
    & > :first-child {
        position: absolute;
        bottom: 50px;
        left: -250px;
        z-index: auto;
    }
`

type Props = {
    open: boolean,
    setOpen: (open:boolean) => void,
};

export const MobileSwipe = (p: Props) => {

    const links = useNavLinks()

    return (
        p.open &&
        <>
            <MainContainer>
                <HeadingBlock>
                    <Logo width={77} height={20} />
                    <div
                        onClick={() => p.setOpen(false)}
                    >
                        <Cross width={18} height={18} />
                    </div>
                </HeadingBlock>
                <RelativeContainer>
                    <BlueLines width={808} height={761} />
                    <Lines width={808} height={761} />

                    <LinksBlock>
                        {links.map((link, i) =>
                            <Link
                                to={link.to}
                                key={i}
                                onClick={() => p.setOpen(false)}
                            >{link.title}</Link>)}
                    </LinksBlock>
                </RelativeContainer>
            </MainContainer>
        </>
    );
};