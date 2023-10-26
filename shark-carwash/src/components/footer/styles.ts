import styled from "styled-components";

export const FooterContainer = styled.div`
display: flex;
flex-direction: column;
height: 65px;
background-color: ${props => props.theme.colors.primaryBackground};
align-items: center;
justify-content: center;
margin-top: 3px;
`



export const MainTitle = styled.span`
    color: ${props => props.theme.colors.primaryTxt};
    font-size: 12px;
    margin-bottom: 2px;
    font-family: 'Agbalumo', cursive;


`


