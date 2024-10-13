import {ChangeEvent, ChangeEventHandler, useState} from "react";

export type BaseNumberInputProps = {
    value: number
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const BaseNumberInput = (p: BaseNumberInputProps) => {

    const [size, setSize] = useState(1)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sizeValue = e.currentTarget.value.length > 0 ? e.currentTarget.value.length : 1
        setSize(sizeValue)
        p.onChange(e)
    }

    return (
        <>
            <input
                type="number"
                value={p.value}
                onChange={onChange}
                size={size}
            />
        </>
    );
};