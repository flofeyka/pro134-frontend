import styled from "styled-components";
import React from "react";

const Container = styled.div`
    border: 1px solid #00000040;
    background-color: #F5F5F5;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 
            0 7px 16px 0 #0000000D,
            0 29px 29px 0 #0000000A,
            0 66px 40px 0 #00000008,
            0 118px 47px 0 #00000003,
            0 184px 52px 0 #00000000;
`

const TextContent = styled.div`
    font-family: var(--montserrat-extrabold);
    font-weight: 900;
    font-size: 16px;
    text-align: center;
    line-height: 20px;
`

type Props = {
    icon: React.ReactElement,
    text: string
}

export const AdvantageCard = (p: Props) => {
    return (
        <>
            <Container>
                <div style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {p.icon}
                </div>
                <TextContent>{p.text}</TextContent>
            </Container>
        </>
    );
};