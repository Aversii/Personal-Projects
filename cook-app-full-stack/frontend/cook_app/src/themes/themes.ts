import Theme from "@/interfaces/themeInterface";

export const darkTheme:Theme = {
    mode: 'dark',
    colors: {
      bgPrimary: '#d65c0a',
      bgSecondary: '545e75',
      bgTerciary: '',
      fontPrimary:'black',
      fontSecondary: '#5b5b5b',
      fontTerciary:'999999 '

    },
    fonts: {
      body: 'Arial, sans-serif',
      heading: 'Helvetica, sans-serif',
      signature:"Arial. sans-serif"
    },
  };
  
  export const lightTheme:Theme = {
    mode: 'light',
    colors: {
      bgPrimary: '#5a5766',
      bgSecondary: '#5b5b5b',
      bgTerciary: '#999999 ',
      fontPrimary:'#ccc',
      fontSecondary: '#5a5766',
      fontTerciary:'gray'

    },
    fonts: {
      body: 'Arial, sans-serif',
      heading: 'Helvetica, sans-serif',
      signature:"Arial. sans-serif"
    },
  };
