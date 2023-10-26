import styled from "styled-components";

export const Container = styled.div`
display: flex;
height: 120px;
background-color: ${props => props.theme.colors.primaryBackground};
align-items: center;
padding: 0 30px;
color: #FFF;
justify-content: space-between;
`
export const TitleContainer = styled.div`
display: flex;
position: absolute;
left: 30%;
right: 50%;
top: -5px;
font-size: 40px;
font-family: 'Agbalumo', cursive;

`

export const Title2Container = styled.div`
display: flex;
position: absolute;
left: 48%;
top: 30px;
font-size: 40px;
font-family: 'Caveat', cursive;
color: ${props => props.theme.colors.secundaryBackground};


`
export const TitleCapitalLetter = styled.span`
    color: ${props => props.theme.colors.primaryTxt};
`

export const TitleMinorLetter = styled.p`
    color: ${props => props.theme.colors.secundaryTxt};
`

export const Title2CapitalLetter = styled.span`
    color: ${props => props.theme.colors.primaryTxt};
`

export const SubtitleContainer = styled.div`
display: flex;
position: absolute;
right: 10%;
top: 80px   ;
font-size: 15px;
font-family: 'Dancing Sport', Courier;
color: #31a0d9;


`
export const ContactContainer = styled.div`
display: flex;
position: absolute;
right: 0;
top: 105px;
font-size: 10px;
`

