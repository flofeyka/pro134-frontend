import styled from "styled-components";
import {AdvantageCard} from "@comp/pages/main-page/common/AdvantageCard";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import AdvCard1 from "@img/adv-card-1.svg";
import AdvCard2 from "@img/adv-card-2.svg";
import AdvCard3 from "@img/adv-card-3.svg";

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-size: clamp(24px, 4vw, 50px);
    font-weight: 800;
    line-height: clamp(29px, 4.5vw, 61px);
    text-align: center;
    
    @media screen and (min-width: 900px) {
        text-align: start;
    }
`

const Container = styled.section`
    padding-bottom: 50px;
`

const Grid = styled.div`
    display: grid;
    margin-top: clamp(0px, 3vw, 40px);
    grid-gap: 20px;
    grid-template-columns: 1fr;
    
    @media screen and (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

export const AdvantageSection = () => {
    return (
        <>
            <Container id="advantage">
                <Wrapper>
                    <Heading>Наши преимущества</Heading>
                    <Grid>
                        <AdvantageCard icon={<AdvCard1 width="70" height="62"/>} text={'Высокое качество товаров'}/>
                        <AdvantageCard icon={<AdvCard2 width="62" height="62"/>} text={'Компактность и портативность'}/>
                        <AdvantageCard icon={<AdvCard3 width="61" height="61"/>} text={'Сертифицированные детали'}/>
                    </Grid>
                </Wrapper>
            </Container>
        </>
    );
};