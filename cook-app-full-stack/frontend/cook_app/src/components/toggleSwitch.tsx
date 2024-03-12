import { useTheme } from "@/context/themeContext";
import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const Switch = styled.div`
    position: relative;
    width: 60px;
    height: 26px;
    background: ${theme.colors.fontPrimary};
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      top: 50%;
      transform: translateX(${theme.mode === "dark" ? "32px" : "0"})
        translateY(-50%);
      background: ${theme.colors.bgPrimary};
    }
  `;

  const Input = styled.input`
    display: none;
  `;

  const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding-right: 20px;
  `;

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <Label>
      <Input
        type="checkbox"
        onChange={handleChange}
        checked={theme.mode === "dark"}
      />
      <Switch />
    </Label>
  );
};

export default ToggleSwitch;
