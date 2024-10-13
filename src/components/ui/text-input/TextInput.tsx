import {BaseTextInput, BaseTextInputProps} from "@comp/ui/text-input/base/BaseTextInput";
import styled from "styled-components";

export type TextInputProps = BaseTextInputProps & {
    errored?: boolean;
};

const Container = styled.div<{$errored?: boolean}>`
    height: 45px;
    border: 1px solid ${p => p.$errored ? '#FF0000' : '#0000001A'};
    border-radius: 5px;
    
    & > input {
        font-family: var(--montserrat-regular);
        font-size: 16px;
        line-height: 20px;
        padding: 12px 15px;
    }
`

export const TextInput = (p: TextInputProps) => {
    return (
        <>
            <Container $errored={p.errored}>
                <BaseTextInput {...p} />
            </Container>
        </>
    );
};