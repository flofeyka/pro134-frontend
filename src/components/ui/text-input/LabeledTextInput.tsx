import {TextInput, TextInputProps} from "@comp/ui/text-input/TextInput";
import styled from "styled-components";
import {randomString} from "@src/lib/random_string";
import {ReactElement} from "react";

export type LabeledTextInputProps = TextInputProps & {
    label: string | ReactElement;
};

const Label = styled.label`
    color: var(--white);
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 16px; 
    text-align: center;
    display: block;
    line-height: 20px;

    @media screen and (min-width: 900px) {
        text-align: start;
    }
`

export const LabeledTextInput = (p: LabeledTextInputProps) => {

    const id = p.id ?? randomString()

    return (
        <>
            <Label htmlFor={id}>{p.label}</Label>
            <TextInput
                {...p}
                id={id}
            />
        </>
    );
};