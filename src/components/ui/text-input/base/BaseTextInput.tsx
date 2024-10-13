import {ChangeEventHandler, InputHTMLAttributes} from "react";
import styled from "styled-components";
import {RegisterOptions, useFormContext, UseFormRegisterReturn} from "react-hook-form";

export type BaseTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    type: 'text' | 'password' | 'email'
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    placeholder?: string,
    id?: string,
    registerOpts?: {
        name: string,
        options?: RegisterOptions
    }
};

const Input = styled.input`
    width: 100%;
    height: 100%;
`

export const BaseTextInput = (p: BaseTextInputProps) => {
    const methods = useFormContext()
    let registerResult: UseFormRegisterReturn

    if (methods !== null && methods !== undefined) {
        registerResult = methods.register(p.registerOpts.name, p.registerOpts.options)
    }

    return (
        <>
            <Input
                type={p.type}
                value={p.value}
                onChange={p.onChange}
                placeholder={p.placeholder}
                id={p.id}
                {...registerResult ?? null}
            />
        </>
    );
};