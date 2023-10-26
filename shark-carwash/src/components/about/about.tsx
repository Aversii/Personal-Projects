import React, { useContext } from "react"
import {  AboutContainer, Title, GridContainer, GridItem, MainTitle,  } from "./styles";
import Switch from "react-switch"
import { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarOn, faSprayCanSparkles, faEyeLowVision} from '@fortawesome/free-solid-svg-icons';


interface IProps{
    toggleTheme():void
}

const About: React.FC = () =>{
    const {colors,title} = useContext(ThemeContext)

    return (
        <AboutContainer>
           
           <MainTitle>Serviços</MainTitle>
           <GridContainer>
                <GridItem>
                <Title>Lava-Rápido</Title>
                <FontAwesomeIcon icon={faCarOn} beat size="2xl" style={{color: "#64e3ff",}}/>
                                </GridItem>
                <GridItem >
                    <Title>Higienização</Title>
                <FontAwesomeIcon icon={faSprayCanSparkles} beat size="2xl" style={{color: "#64e3ff",}} />
                    
                </GridItem>
                <GridItem>
                <Title>Polimento de Faróis</Title>
                <FontAwesomeIcon icon={faEyeLowVision} beat size="2xl" style={{color: "#64e3ff",}} />
                </GridItem>
           </GridContainer>

        </AboutContainer>
    );
}

export default About