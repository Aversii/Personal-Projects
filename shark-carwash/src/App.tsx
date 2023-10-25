import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import Header from './components/header/header';
import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import usePersistedState from "./hooks/usePersistedState"
function App() {

const [theme, setTheme]= usePersistedState<DefaultTheme>("theme",light)

const toggleTheme=()=>{
  setTheme(theme.title === "dark" ? light: dark)
}
  return (

    <ThemeProvider theme={theme}>
      <div className="App">
      <GlobalStyle/>

      <Header toggleTheme={toggleTheme} />

      </div>

    </ThemeProvider>

  );
}

export default App;
