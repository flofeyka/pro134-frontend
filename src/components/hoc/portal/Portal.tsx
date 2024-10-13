import {createPortal} from "react-dom";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
};
export const Portal = (p: Props) => {
    return createPortal(
        p.children,
        document.getElementById('portal')
    );
};