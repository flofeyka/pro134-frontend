import {BaseCheckbox, BaseCheckboxProps} from "./base/BaseCheckbox";
import React, {ChangeEvent, useState} from "react";
import Mark from '@img/Mark.svg'
import styled from "styled-components";
import {randomString} from "@src/lib/random_string";

type CheckboxProps = BaseCheckboxProps & {
    labelText: string,
    invert?: boolean,
    checked: boolean,
    setChecked: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Label = styled.label<{$invert?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
    flex-direction: ${p => p.$invert ? 'row-reverse' : 'row'};
`

const MarkWrapper = styled.div<{$checked: boolean}>`
    position: absolute;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    visibility: ${p => p.$checked  ? 'visible' : 'hidden'};
`

const LabelText = styled.div`
    font-family: var(--montserrat-regular);
    font-weight: 500;
    font-size: 15px;
    text-wrap: nowrap;
`

const CheckboxContainer = styled.div`
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #00000033;
    position: relative;
    flex-shrink: 0;
`

export const Checkbox = (p: CheckboxProps) => {

    const id = p.id ?? randomString()

    return (
        <>
            <Label htmlFor={id} $invert={p.invert}>

                <LabelText>{p.labelText}</LabelText>

                <CheckboxContainer>
                    <BaseCheckbox
                        styles={{
                            display: 'none'
                        }}
                        id={id}
                        checked={p.checked}
                        setChecked={p.setChecked}
                    />

                    <MarkWrapper $checked={p.checked}>
                        <Mark width="13" height="10" />
                    </MarkWrapper>
                </CheckboxContainer>
            </Label>
        </>
    )
}