import styled from "styled-components";
import {Review} from "@comp/common/review/Review";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import AvatarSrc1 from "@img/review-1.png"
import AvatarSrc2 from "@img/review-2.png"
import AvatarSrc3 from "@img/review-3.png"

const Container = styled.section`
    padding-top: clamp(30px, 4vw, 40px);
    padding-bottom: clamp(30px, 4vw, 40px);
    background: linear-gradient(180deg, #151515 0%, #101010 100%);
`

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-size: clamp(24px, 4vw, 50px);
    font-weight: 800;
    line-height: 29px;
    text-align: center;
    color: var(--white);
    margin-bottom: clamp(30px, 4.5vw, 40px);

    @media screen and (min-width: 900px) {
        text-align: left;
    }
`

const Grid = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;

    @media screen and (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
`


export const ReviewSection = () => {
    return (
        <Container id="reviews">
            <Wrapper>
                <Heading>Наши отзывы</Heading>
                <Grid>
                    <Review
                        avatar={AvatarSrc1}
                        username={'Алиса С.'}
                        text={'Купила электростанцию для поездок на природу и не пожалела!' +
                            ' Теперь у меня всегда есть зарядка для телефона,' +
                            ' планшета, ноутбука, а также свет для вечерних посиделок.' +
                            ' Отличное качество и компактность, рекомендую!'}
                    />
                    <Review
                        avatar={AvatarSrc2}
                        username={'Андрей Н.'}
                        text={'На даче нет постоянного электричества, и эта станция  стала  настоящим спасением!' +
                            ' Теперь у меня есть свет, можно  включить холодильник,' +
                            ' сделать  зарядку телефона и даже  посмотреть телевизор.'}
                    />
                    <Review
                        avatar={AvatarSrc3}
                        username={'Анатолий К.'}
                        text={'Работаю на строительстве и часто бывают проблемы с электричеством.' +
                            ' Эта станция  решила все проблемы!' +
                            ' Теперь  у  меня всегда есть питание для  инструмента и света.  Рекомендую!'}
                    />
                </Grid>
            </Wrapper>
        </Container>
    );
};
