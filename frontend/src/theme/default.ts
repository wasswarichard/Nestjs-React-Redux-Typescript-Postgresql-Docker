import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
   palette: {
      primary: {
         main: '#121D33',
      },
      secondary: {
         main: blue[500],
      },
      error: {
         main: red[500],
      },
   },
});

export const defaultTheme = createTheme({
   ...theme,
   typography: {
      fontFamily: ['Inter', 'Nunito', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
   },
   components: {
      MuiTextField: {
         defaultProps: {
            variant: 'outlined',
            size: 'medium',
            fullWidth: true,
         },
      },
   },
});
