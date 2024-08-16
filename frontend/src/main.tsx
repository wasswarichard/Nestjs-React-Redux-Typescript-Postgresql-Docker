import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './theme';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={defaultTheme}>
            <StyledEngineProvider injectFirst>
               <CssBaseline />
               <App />
            </StyledEngineProvider>
         </ThemeProvider>
      </Provider>
   </React.StrictMode>,
);

// testing
