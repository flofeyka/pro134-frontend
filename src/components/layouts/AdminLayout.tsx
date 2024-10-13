import styled from "styled-components";
import {Outlet} from "react-router-dom";

const MainContainer = styled.main`
    min-width: 100vw;
    min-height: 100vh;
    background-color: #F5F5F5;
`

export const AdminLayout = () => {
    return (
        <>
            <MainContainer>
                <Outlet/>
            </MainContainer>
        </>
    );
};