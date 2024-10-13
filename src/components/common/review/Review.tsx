import styled from "styled-components";
import Star from "@img/Star.svg"

type Props = {
    avatar: string,
    username: string,
    text: string
}

const MainContainer = styled.div`
    padding-top: 35px;
`

const Avatar = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: -35px;
    left: calc(50% - 35px);
`

const Container = styled.div`
    padding: 45px 25px 20px 25px;
    background-color: var(--white);
    position: relative;
    border-radius: 10px;
    height: 320px;
`

const Title = styled.h3`
    font-family: var(--montserrat-extrabold);
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
    text-align: center;
`

const StarContainer = styled.div`
    margin: 3px auto 0 auto;
    display: flex;
    justify-content: center;
`

const Text = styled.div`
    margin-top: 10px;
    text-align: center;
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
`

export const Review = (p: Props) => {
    return (
        <MainContainer>
            <Container>
                <Avatar src={p.avatar} />
                <Title>{p.username}</Title>
                <StarContainer>
                    <Star width="22" height="22" />
                    <Star width="22" height="22" />
                    <Star width="22" height="22" />
                    <Star width="22" height="22" />
                    <Star width="22" height="22" />
                </StarContainer>
                <Text>{p.text}</Text>
            </Container>
        </MainContainer>
    );
};