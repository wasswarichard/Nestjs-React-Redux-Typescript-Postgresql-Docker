import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import Header from '../Header';
import './index.sass';

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <Grid container className="mainContainer">
         <Grid item xs={12}>
            <Header />
         </Grid>
         <Grid item xs={12} className="contentContainer">
            {children}
         </Grid>
      </Grid>
   );
};
export default Layout;
