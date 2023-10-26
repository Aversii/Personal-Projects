import React, { useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import Header from './components/header/header';
import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import usePersistedState from "./hooks/usePersistedState";
import { BackgroundImg } from './components/header/styles';
import About from './components/about/about';

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {setIsVisible(true)}, [theme]); 

  const toggleTheme = () => {
    setIsVisible(false);
    setTimeout(() => {
      setTheme(theme.title === "dark" ? light : dark);
    }, 300); 
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <Header toggleTheme={toggleTheme} />
        <BackgroundImg src={theme.imgs.wallpaper} alt="Wallpaper" className={isVisible ? "visible" : ""} />
        <About/>
      </div>
    </ThemeProvider>
  );
}

export default App;
