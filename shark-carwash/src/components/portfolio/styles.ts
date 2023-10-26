import styled from "styled-components";

export const PortfolioContainer = styled.div`
margin-top: 3px;
display: flex;
flex-direction: column;
height: 450px;
background-color: ${props => props.theme.colors.primaryBackground};
align-items: center;
justify-content: center;
color: #FFF;
padding: 0 30px;




`
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ; /* 3 colunas com largura igual (1fr) */
  grid-template-rows: 1fr 1fr 1fr; /* 2 linhas com altura igual (1fr) */
  grid-gap: 5px; /* Espaçamento entre os itens (vertical e horizontalmente) */
  width: 97%; /* Ocupa toda a largura do pai */
  height: 97%; /* Ocupa toda a altura do pai */

`;

export const GridItem = styled.div`
  background-color: ${props => props.theme.colors.secundaryBackground};
  color: #fff;
  margin-left: -30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: solid 1px ${props => props.theme.colors.primaryTxt};
  border-radius: 20px;
  width: 165px;
  height: 120px;
  margin-right:45px;
  margin-top: 10px;

`;



export const MainTitle = styled.span`
    color: ${props => props.theme.colors.primaryTxt};
    font-size: 34px;
    margin-bottom: 20px;
    font-family: 'Agbalumo', cursive;


`


export const Title = styled.span`
    color: ${props => props.theme.colors.primaryTxt};
    font-size: 24px;
    margin-bottom: 20px;
    font-family: 'Agbalumo', cursive;


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
