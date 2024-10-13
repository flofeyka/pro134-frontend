import React, {ChangeEvent, CSSProperties} from "react";

export type BaseCheckboxProps = {
    styles?: CSSProperties
    id?: string,
    setChecked?: (event: ChangeEvent<HTMLInputElement>) => void,
    checked?: boolean
}

export const BaseCheckbox = (p: BaseCheckboxProps) => {

    return (
        <>
            <input
                type="checkbox"
                style={p.styles}
                id={p.id}
                onChange={p.setChecked}
                checked={p.checked ?? false}
            />
        </>
    );
};