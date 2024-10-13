import InputMask from "react-input-mask";
import {useFormContext, UseFormRegisterReturn} from "react-hook-form";
import styled from "styled-components";
import {LabeledTextInputProps} from "@comp/ui/text-input/LabeledTextInput";
import {randomString} from "@src/lib/random_string";

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

const InputWrapper = styled.div<{$errored: boolean}>`
    height: 45px;
    border: 1px solid ${p => p.$errored ? '#FF0000' : '#0000001A'};
    border-radius: 5px;

    & > input {
        font-family: var(--montserrat-regular);
        font-size: 16px;
        line-height: 20px;
        padding: 12px 15px;
        width: 100%;
        height: 100%;
    }
`

type Props = LabeledTextInputProps & {

}

export const LabeledPhoneInput = (p: Props) => {

    const id = p.id ?? randomString()

    const methods = useFormContext()
    let registerResult: UseFormRegisterReturn

    if (methods !== null && methods !== undefined) {
        registerResult = methods.register(p.registerOpts.name, p.registerOpts.options)
    }

    return (
        <>
            <Label htmlFor={id}>{p.label}</Label>
            <InputWrapper $errored={p.errored}>
                <InputMask
                    mask="+7(999)-999-99-99"
                    value={p.value}
                    onChange={p.onChange}
                    id={p.id}
                    placeholder={p.placeholder}
                    type="tel"
                    {...registerResult}
                />
            </InputWrapper>
        </>
    );
};