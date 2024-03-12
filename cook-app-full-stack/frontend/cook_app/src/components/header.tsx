import { useTheme } from "@/context/themeContext";
import { darkTheme, lightTheme } from "@/themes/themes";
import { useState } from "react";
import { styled } from "styled-components"
import ToggleSwitch from "./toggleSwitch";


const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
  
    const Container = styled.div`
      height: 12vh;
      width: 100%;
      background-color: ${props => props.theme.colors.bgPrimary};
      color: ${props => props.theme.colors.fontPrimary};
      font-family: ${props => props.theme.fonts.body};
      display: flex;
      justify-content: end;
    `;
  
    return (
      <Container theme={theme}>
        <ToggleSwitch/>
      </Container>
    );
  };
  
  export default Header;