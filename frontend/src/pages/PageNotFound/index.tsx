import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export interface IPageNotFound {}

const PageNotFound: FC<IPageNotFound> = () => {
   return (
      <Grid
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justifyContent="center"
         style={{ minHeight: '100vh' }}
      >
         <Typography variant="h5">Page not found</Typography>
         <Typography variant="body1">
            <Link to="/">Go to dashboard</Link>
         </Typography>
      </Grid>
   );
};

export default PageNotFound;
