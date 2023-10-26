import React, { useContext } from "react"
import { ContactContainer, Container, SubtitleContainer, Title2Container, TitleCapitalLetter, TitleContainer, TitleMinorLetter } from "./styles";
import Switch from "react-switch"
import { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface IProps{
    toggleTheme():void
}

const goToWpp = () => {
    const url = 'https://web.whatsapp.com/send/?phone=5511970970090&text=Olá, gostaria de agendar uma lavagem';
    
    // Abre um novo link em uma nova guia do navegador
    window.open(url, '_blank');
}

const Header: React.FC<IProps> = ({toggleTheme}) =>{
    const {colors,title} = useContext(ThemeContext)

    return (
        <Container>
            <Switch
                onChange={toggleTheme}
                checked={title === "light"}
                checkedIcon={true}
                uncheckedIcon={false}
                height={8}
                width={35}
                handleDiameter={15}
                onColor={colors.secundaryBackground}
                offColor={colors.secundaryBackground}
                onHandleColor={colors.secundaryBackground}
                offHandleColor={colors.secundaryBackground}
                       
           />
           <TitleContainer>
           <TitleCapitalLetter>
                S
           </TitleCapitalLetter>
           <TitleMinorLetter>
                hark
           </TitleMinorLetter>



           </TitleContainer>
           <Title2Container>
           <TitleCapitalLetter>
                W
           </TitleCapitalLetter>
           <TitleMinorLetter>
                ash
           </TitleMinorLetter>


           </Title2Container>
            <SubtitleContainer>
                <p> Lavagem Automotiva Especializada</p>
            </SubtitleContainer>
            <ContactContainer onClick={goToWpp}>
                <p>Solicite por Whatsapp   </p>    

            <FontAwesomeIcon icon={faWhatsapp} beat size="lg" style={{color: "#64e3ff",}} />                
                <p> 11 970970090</p>

            </ContactContainer>
           
        </Container>
    );
}

export default Header