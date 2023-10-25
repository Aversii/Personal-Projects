import React, { useContext } from "react"
import { Container } from "./styles";
import Switch from "react-switch"
import { ThemeContext } from "styled-components";

interface IProps{
    toggleTheme():void
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
                height={12}
                width={45}
                handleDiameter={20}
                onColor={colors.primary}
                offColor={colors.secundary}
                onHandleColor={"crimson"}
                offHandleColor={"orange"}       
           />
        </Container>
    );
}

export default Header