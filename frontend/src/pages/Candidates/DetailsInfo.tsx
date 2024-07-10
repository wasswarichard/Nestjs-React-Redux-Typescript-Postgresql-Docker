import { ICandidate } from '../../types';
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const DetailsInfoPage = ({ candidate }: { candidate: ICandidate }) => {
   return (
      <Table>
         <TableBody>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">First Name</Typography>
               </TableCell>
               <TableCell data-testid="movie-title">
                  <Typography variant="body1">{candidate.firstname}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Last Name</Typography>
               </TableCell>
               <TableCell data-testid="movie-plot">
                  <Typography variant="body1">{candidate.lastname}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Email</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.email}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Comment</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.comment}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Phone Number</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.phoneNumber}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Time Interval</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.timeInterval}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Linkedin Link</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.linkedin}</Typography>
               </TableCell>
            </TableRow>
            <TableRow>
               <TableCell>
                  <Typography variant="body1">Github Link</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant="body1">{candidate.github}</Typography>
               </TableCell>
            </TableRow>
         </TableBody>
      </Table>
   );
};
export default DetailsInfoPage;
