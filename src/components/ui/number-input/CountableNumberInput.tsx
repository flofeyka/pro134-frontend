import {NumberInput, NumberInputProps} from "@comp/ui/number-input/NumberInput";
import Minus from "@img/minus.svg";
import Plus from "@img/plus.svg";

import styled from "styled-components";
import {useState} from "react";

const MainContainer = styled.div`
    display: flex;
    flex-shrink: 0;
    gap: 14px;
    align-items: center;
`

const CounterButton = styled.button`
    display: block;
    padding: 0;
    width: 16px;
    height: 18px;
    margin: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
`

type Props = NumberInputProps & {
    setCount: (count: number) => void;
};

export const CountableNumberInput = (p: Props) => {

    const decrement = () => {
        if (p.value > 0) {
            p.setCount(p.value - 1)
        }
    }

    const increment = () => p.setCount(p.value + 1)

    return (
        <>
            <MainContainer>
                <CounterButton onClick={decrement}>
                    <Minus width="16" height="18px"/>
                </CounterButton>
                <NumberInput
                    {...p}
                    value={p.value}
                    onChange={p.onChange}
                />
                <CounterButton onClick={increment}>
                    <Plus width="16" height="18px"/>
                </CounterButton>
            </MainContainer>
        </>
    );
};