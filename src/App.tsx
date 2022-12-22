import '@fontsource/open-sans/300.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './redux/app/store';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

import Header from './components/Header';
import Routers from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <HelmetProvider>
              <Header />
              <Routers />
              <Footer />
              <ToastContainer autoClose={3000} className="toast-container" />
              <GlobalStyles />
            </HelmetProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
