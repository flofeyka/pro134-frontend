import styled from "styled-components";
import {ChangeEventHandler} from "react";
import {randomString} from "@src/lib/random_string";

const MainContainer = styled.label`
    width: 210px;
    height: 210px;
    background-color: #D9D9D9;

    border-radius: 10px;
    overflow: hidden;
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 128px;
    color: #0047FF;
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Input = styled.input`
    display: none;
`

type Props = {
    onChange: ChangeEventHandler
}

export const AddImageInput = (p: Props) => {
    const id = randomString()

    return (
        <>
            <MainContainer htmlFor={id}>
                <div>+</div>
                <Input
                    id={id}
                    type="file"
                    accept="image/*"
                    onChange={p.onChange}
                />
            </MainContainer>
        </>
    );
};
