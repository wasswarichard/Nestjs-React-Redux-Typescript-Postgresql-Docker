import { FunctionComponent } from 'react';
import {
   INDEX_ROUTE_PATH,
   CANDIDATES_ROUTE_PATH,
   VIEW_CANDIDATE_ROUTE_PATH,
} from '../../route-paths';
import { Grid, Typography } from '@mui/material';
import Breadcrumbs from '../../components/breadcrumbs';
import useSWR from 'swr';
import { ICandidate } from '../../types';
import { getInterporatedPath } from '../../utils';
import { GET_CANDIDATE_ENDPOINT_PATH } from '../../endpoint-paths';
import { useParams } from 'react-router-dom';
import DetailsInfo from './DetailsInfo.tsx';
import LoadingSpinner from '../../components/LoadingSpinner';

const CandidateDetails: FunctionComponent = () => {
   const { id } = useParams();
   const breadcrumbs = [
      { label: 'Explorer', navigateTo: INDEX_ROUTE_PATH },
      { label: 'Candidate', navigateTo: CANDIDATES_ROUTE_PATH },
      { label: 'view', navigateTo: getInterporatedPath(VIEW_CANDIDATE_ROUTE_PATH, { id }) },
   ];
   const { data: candidate, isLoading } = useSWR<ICandidate>(
      getInterporatedPath(GET_CANDIDATE_ENDPOINT_PATH, { id }),
   );
   return (
      <Grid container>
         <Grid item xs={12}>
            <Breadcrumbs data={breadcrumbs} />
         </Grid>
         <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
            <Typography variant="h6">Candidate Details</Typography>
         </Grid>
         <Grid item xs={12}>
            {candidate && <DetailsInfo candidate={candidate} />}
         </Grid>
         <Grid item xs={12}>
            {isLoading && <LoadingSpinner />}
         </Grid>
      </Grid>
   );
};
export default CandidateDetails;
