import { FunctionComponent, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Breadcrumbs from '../../components/breadcrumbs';
import {
   ADD_CANDIDATE_ROUTE_PATH,
   CANDIDATES_ROUTE_PATH,
   INDEX_ROUTE_PATH,
   VIEW_CANDIDATE_ROUTE_PATH,
} from '../../route-paths';
import { ICandidate } from '../../types';
import useSWR from 'swr';
import { addSearchParams, getInterporatedPath } from '../../utils';
import { GET_CANDIDATES_ENDPOINT_PATH } from '../../endpoint-paths';
import DataTable, { ColumnConfig } from '../../components/DataTable.tsx';
import { useNavigate } from 'react-router-dom';
const breadcrumbs = [
   { label: 'Explorer', navigateTo: INDEX_ROUTE_PATH },
   { label: 'Candidates', navigateTo: CANDIDATES_ROUTE_PATH },
];

const columns: ColumnConfig[] = [
   {
      id: 'firstname',
      label: 'First Name',
      minWidth: 170,
      format: (name: string) => name,
   },
   {
      id: 'lastname',
      label: 'Last Name',
      minWidth: 170,
      format: (name: string) => name,
   },
   {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      format: (name: string) => name,
   },
   {
      id: 'comment',
      label: 'Comment',
      minWidth: 170,
      format: (name: string) => name,
   },
];

const Candidates: FunctionComponent = () => {
   const navigate = useNavigate();
   const [offset, setOffset] = useState<number>(0);
   const limit = 2;
   const { data } = useSWR(
      addSearchParams(GET_CANDIDATES_ENDPOINT_PATH, { limit, page: offset * limit }),
   );
   const handleChange = (value: number) => {
      setOffset(value);
   };
   const onClickRow = (id: number) => {
      navigate(getInterporatedPath(VIEW_CANDIDATE_ROUTE_PATH, { id }));
   };

   return (
      <Grid container>
         <Grid item xs={12}>
            <Breadcrumbs data={breadcrumbs} />
         </Grid>
         <Grid item xs={12}>
            <Button variant="contained" href={ADD_CANDIDATE_ROUTE_PATH} className="float-right">
               ADD
            </Button>
         </Grid>
         <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
            <Typography variant="h6">All Candidate</Typography>
         </Grid>
         <div className="mt-4 w-full">
            { data && (
               <DataTable
                  tableData={data.candidates as ICandidate[]}
                  totalRecords={data.count}
                  columns={columns}
                  handlePageChange={handleChange}
                  recordsPerPage={limit}
                  paginatedTable={true}
                  fullPageTable={true}
                  onClickRow={onClickRow}
               />
            )}
         </div>
      </Grid>
   );
};

export default Candidates;
