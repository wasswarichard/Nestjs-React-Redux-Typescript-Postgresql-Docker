import { FC } from 'react';
import { AppBar, Grid, Typography } from '@mui/material';
import './index.sass';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
   return (
      <AppBar className="appBar">
         <Grid container className="headerContainer">
            <Grid item xs={12}>
               <Typography variant="h4" data-testid="company-logo">
                  Candidates
               </Typography>
            </Grid>
         </Grid>
      </AppBar>
   );
};
export default Header;
