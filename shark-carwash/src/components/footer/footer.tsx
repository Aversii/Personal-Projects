import React, { useContext } from "react"
import {  FooterContainer, MainTitle,  } from "./styles";
import Switch from "react-switch"
import { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () =>{
    const {colors,title} = useContext(ThemeContext)
    const goToWpp = () => {
        const url = 'https://web.whatsapp.com/send/?phone=5511970970090&text=Olá, Gostaria de agendar uma lavagem. Qual o horário disponível?';
        window.open(url, '_blank');
    }
    

    return (
        <FooterContainer onClick={goToWpp}>
           
           <MainTitle>@2023 - Shark Wash </MainTitle>
           <MainTitle>Rua Amaro Silles da Silva, 12 - Itapecerica da Serra</MainTitle>
           <FontAwesomeIcon icon={faWhatsapp} beat size="lg" style={{color: "#64e3ff",paddingTop:"1px"}} />          

        </FooterContainer>
    );
}

export default Footer