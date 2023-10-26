import styled from "styled-components";

export const AboutContainer = styled.div`
display: flex;
flex-direction: column;
height: 500px;
background-color: ${props => props.theme.colors.primaryBackground};
align-items: center;
justify-content: center;
padding: 0 30px;
color: #FFF;



`
export const GridContainer = styled.div`
  display: grid;
  background-color: ${props => props.theme.colors.primaryBackground};
  gap: 15px;
  grid-template-rows: 110px 110px 110px; 
  grid-template-columns: 110px ;
  margin: 20px;

  



`

export const GridItem = styled.div`
  //background-color: ${props => props.theme.colors.secundaryBackground};
  color: #fff;
  padding: 10px;
  margin:  0 -70px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: solid 1px ${props => props.theme.colors.primaryTxt};
  border-radius: 20px;
  width: 250px;


  :nth-child(2) span{
    color: ${props => props.theme.colors.primaryTxt};

  }

`

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
