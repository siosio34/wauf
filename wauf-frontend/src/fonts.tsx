import { Global } from "@emotion/react";

const Fonts = () => {
  return (
    <Global
      styles={`
    /* latin-ext */
    @font-face {
      font-family: 'Geologica';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('../src/assets/fonts/Geologica-Bold.ttf');
    }
    /* latin */
    @font-face {
      font-family: 'Geologica';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url('../src/assets/fonts/Geologica-SemiBold.ttf');
    }
    /* latin */
    @font-face {
      font-family: 'Geologica';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('../src/assets/fonts/Geologica-Regular.ttf');
     
    }
    /* latin */
    @font-face {
      font-family: 'Geologica';
      font-style: normal;
      font-weight: 300;
      font-display: swap;
      src: url('../src/assets/fonts/Geologica-Light.ttf');
    }
    `}
    />
  );
};
