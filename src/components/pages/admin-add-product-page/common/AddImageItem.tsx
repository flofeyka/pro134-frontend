import styled from "styled-components";

const Image = styled.img<{$show: boolean}>`
    width: inherit;
    height: inherit;
    object-fit: cover;
    object-position: center;
    display: ${p => p.$show ? 'block' : 'none'};
`

const MainContainer = styled.div`
    width: 210px;
    aspect-ratio: 1;
    border-radius: 10px;
    background-color: #D9D9D9;
    overflow: hidden;
`

type Props = {
    src: string
};

export const AddImageItem = (p: Props) => {
    return (
        <>
            <MainContainer>
                <Image
                    $show={Boolean(p.src)}
                    src={p.src}
                    alt=""
                />
            </MainContainer>
        </>
    );
};
