import {ReactNode} from "react";
import styled from "styled-components";

type Props = {
    children?: ReactNode
}

const WrapperContainer = styled.div`
    width: clamp(340px, 90vw, 1684px);
    margin: 0 auto;
    
    container-name: wrapper;
    container-type: inline-size;
`

export const Wrapper = (p: Props) => {
    return (
        <>
            <WrapperContainer>
                {p.children}
            </WrapperContainer>
        </>
    );
}
