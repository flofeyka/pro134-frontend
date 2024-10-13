import {BaseNumberInput, BaseNumberInputProps} from "@comp/ui/number-input/base/BaseNumberInput";
import styled from "styled-components";

const MainContainer = styled.div`
    display: inline-block;
    overflow: hidden;
    
    & input {
        appearance: textfield;
        -moz-appearance: textfield;
        -o-appearance: textfield;
        width: fit-content;
        text-align: center;
        padding: 11px 6px;
        background-color: transparent;
        border-radius: 8px;
        border: 1px solid #00000040;
        outline: none;
        font-family: var(--montserrat-regular);
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #0047FF;
        max-width: 40px;
        
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
`

export type NumberInputProps = BaseNumberInputProps & {

};

export const NumberInput = (p: NumberInputProps) => {
    return (
        <>
            <MainContainer>
                <BaseNumberInput
                    {...p}
                />
            </MainContainer>
        </>
    );
};