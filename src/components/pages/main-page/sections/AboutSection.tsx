import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import AboutSrc from "@img/about.png";

const AboutWrapper = styled.div`
    padding-top: clamp(50px, 8vw, 120px);
    padding-bottom: 50px;
`

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: clamp(24px, 4vw, 50px);
    line-height: 29px;
    text-align: center;
    margin-bottom: clamp(10px, 3vw, 40px);

    @media screen and (min-width: 900px) {
        text-align: start;
    }
`

const SectionText = styled.div`
    font-family: var(--montserrat-regular);
    font-size: clamp(12px, 1.3vw, 20px);
    font-weight: 500;
    line-height: clamp(14px, 1.8vw, 24px);
    text-align: center;

    @media screen and (min-width: 900px) {
        text-align: start;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 20px;
`

const Image = styled.img`
    display: none;
    width: clamp(300px, 35vw, 430px);
    
    aspect-ratio: 43 / 30;
    object-fit: cover;
    object-position: center;
    flex-shrink: 0;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
    box-shadow: 
            0 10px 16px 0 #0000000D,
            0 14px 29px 0 #0000000A,
            0 37px 40px 0 #00000008,
            0 84px 47px 0 #00000003;
    
    @media screen and (min-width: 900px) {
        display: block;
    }

    @media screen and (min-width: 1600px) {
        width: clamp(500px, 55vw, 1062px);
        aspect-ratio: 1062 / 475;
    }
`

export const AboutSection = () => {
    return (
        <>
            <Wrapper>
                <AboutWrapper id="about">
                    <Heading>О нас</Heading>
                    <Flex>
                        <SectionText>
                            Наша история началась с простой идеи: сделать мир более  независимым от централизованного электроснабжения.
                            <br/>
                            Мы  убеждены, что портативные электростанции - это не просто удобство,  а истинная свобода. Свобода отключиться от сети и наслаждаться  жизнью в любом месте, в любое время.
                            Мы  хотим, чтобы портативные электростанции стали неотъемлемой  частью вашего образа жизни, обеспечивая вам  комфорт и свободу в  любой ситуации. Мы стремимся к тому, чтобы наша продукция  помогла людям открыть для себя новые возможности, расширить  свои горизонты и наслаждаться жизнью в полной мере.
                            Мы приглашаем вас  познакомиться с нашим ассортиментом  портативных электростанций и ощутить свободу энергии в ваших  руках. Свяжитесь с нами, чтобы получить консультацию и заказать  идеальную модель для ваших нужд!
                            Вместе мы создадим мир, полный энергии и возможностей!
                        </SectionText>
                        <Image src={AboutSrc} alt="about" />
                    </Flex>
                </AboutWrapper>
            </Wrapper>
        </>
    );
};