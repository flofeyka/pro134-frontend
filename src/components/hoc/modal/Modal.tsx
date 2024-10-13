import {Portal} from "@comp/hoc/portal/Portal";
import styled from "styled-components";
import {ReactNode} from "react";

const Background = styled.div`
    position: absolute;
    z-index: 98;
    background-color: #00000080;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`

type Props = {
    children: ReactNode;
};
export const Modal = (p: Props) => {
    return (
        <>
            <Portal>
                <Background/>
                {p.children}
            </Portal>
        </>
    );
};