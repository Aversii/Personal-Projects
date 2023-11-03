import React, { useContext } from "react"
import {  PortfolioContainer, Title, GridContainer, GridItem, MainTitle,  } from "./styles";
import Switch from "react-switch"
import { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface IProps{
    toggleTheme():void
}

const Portfolio: React.FC = () =>{
    const {colors,title} = useContext(ThemeContext)

    return (
        <PortfolioContainer>           
           <GridContainer>
                <GridItem>
                
                </GridItem>
                <GridItem >

                    
                </GridItem>
                <GridItem>

                </GridItem>
                <GridItem>

                </GridItem>
                <GridItem>

                </GridItem>
                <GridItem>

                </GridItem>
           </GridContainer>
        </PortfolioContainer>
    );
}

export default Portfolio