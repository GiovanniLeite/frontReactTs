import '@fontsource/open-sans/300.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { theme } from '../src/styles/theme';
import { GlobalStyles } from '../src/styles/GlobalStyles';

initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withThemeProvider = (Story, context) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Story {...context} />
        <ToastContainer autoClose={3000} className="toast-container" />
        <GlobalStyles />
      </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export const decorators = [mswDecorator, withThemeProvider];
