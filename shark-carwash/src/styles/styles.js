import styled, { css } from "styled-components";

export const Container = styled.div`
    ${({theme})=>css`
        background-color: ${theme.colors.terciaryClr};
    `};
    height: 100vh; 
    width: 100vw;
`;
