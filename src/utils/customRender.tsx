import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { theme } from '../styles/theme';

export const customRender = (children: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          {children}
          <ToastContainer autoClose={3000} className="toast-container" />
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>,
  );
};
