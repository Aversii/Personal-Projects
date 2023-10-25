import styled from "styled-components";

export const Container = styled.div`
display: flex;
height: 60px;
background-color: ${props => props.theme.colors.primary};
align-items: center;
padding: 0 30px;
color: #FFF;
justify-content: space-between;
`