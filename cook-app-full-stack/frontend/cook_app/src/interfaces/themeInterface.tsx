export default interface Theme {
    mode: 'light' | 'dark';
    colors: {
      bgPrimary: string;
      bgSecondary: string;
      bgTerciary: string;
      fontPrimary: string;
      fontSecondary: string;
      fontTerciary: string;

    };
    fonts: {
      body: string;
      heading: string;
      signature: string;
    };
  }