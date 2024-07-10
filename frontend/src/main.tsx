import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
         <StyledEngineProvider injectFirst>
            <CssBaseline />
            <App />
         </StyledEngineProvider>
      </ThemeProvider>
   </React.StrictMode>,
);
