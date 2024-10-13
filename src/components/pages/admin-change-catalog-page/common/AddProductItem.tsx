import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const MainContainer = styled.div`
    min-width: 250px;
    height: 100%;
    background-color: #F5F5F5;
    border: 1px solid #B8B8B8;
    box-shadow: 0 10px 16px 0 #0000000D,
    0 14px 29px 0 #0000000A,
    0 37px 40px 0 #00000008,
    0 84px 47px 0 #00000003;

    border-radius: 10px;
    overflow: hidden;
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 128px;
    color: #0047FF;
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`


export const AddProductItem = () => {
    const navigate = useNavigate();

    return (
        <>
            <MainContainer
                onClick={() => navigate("/admin/product")}
            >
                <div>+</div>
            </MainContainer>
        </>
    );
};
