import styled, { css } from "styled-components";

export const Container = styled.div`
    ${(props)=> css`
        background-color: ${props.background};
    `};
    height: 100vh;
    width: 100vw;
`;
