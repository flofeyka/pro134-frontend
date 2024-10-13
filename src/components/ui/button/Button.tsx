import styled from "styled-components";

const Container = styled.div<{ $invert?: boolean }>`
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: clamp(12px, 2vw, 16px);
    line-height: clamp(14px, 3vw, 20px);
    color: ${p => p.$invert ? 'var(--blue)' : 'var(--white)'};
    padding: 13px 30px;
    background-color: ${p => p.$invert ? 'var(--white)' : 'var(--blue)'};
    border-radius: 23px;
    border: 1px solid var(--blue);
    display: inline-block;
    cursor: pointer;
    text-align: center;
    text-wrap: nowrap;
`

type Props = {
    text: string,
    invert?: boolean
}

export const Button = (p: Props) => {
    return (
        <>
            <Container $invert={p.invert} >{p.text}</Container>
        </>
    );
};