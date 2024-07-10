import {
   Pagination,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableFooter,
   TableHead,
   TableRow,
} from '@mui/material';
import { ChangeEvent, FunctionComponent } from 'react';

export interface ColumnConfig {
   id: string;
   label: string;
   minWidth?: number;
   align?: 'right';
   format?: (value: string) => string | JSX.Element;
}
interface DataTableProps {
   columns: ColumnConfig[];
   tableData: any[];
   totalRecords?: number;
   handlePageChange?: (value: number) => void;
   onClickRow?: (id: number) => void;
   recordsPerPage?: number;
   tableTitle?: string;
   paginatedTable?: boolean;
   fullPageTable?: boolean;
}

const DataTable: FunctionComponent<DataTableProps> = ({
   columns,
   tableData,
   totalRecords = 0,
   handlePageChange,
   recordsPerPage = 20,
   tableTitle,
   paginatedTable = false,
   fullPageTable = false,
   onClickRow,
}) => {
   const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
      if (handlePageChange) {
         handlePageChange(newPage - 1);
      }
   };

   return (
      <TableContainer component={Paper} className={fullPageTable ? 'h-full' : ''}>
         <Table aria-label="simple table" stickyHeader>
            <TableHead className="z-0">
               {tableTitle && (
                  <TableRow>
                     <TableCell
                        align="right"
                        colSpan={columns?.length}
                        className=" p-4 bg-[#F6F8FB] font-bold"
                     >
                        {tableTitle}
                     </TableCell>
                  </TableRow>
               )}
               <TableRow className="">
                  {columns?.map((column) => (
                     <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className="font-bold bg-[#FAFAFA]"
                     >
                        {column.label}
                     </TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {tableData?.map((data, index) => (
                  <TableRow
                     key={index}
                     onClick={() => onClickRow && onClickRow(data.id)}
                     className="cursor-pointer"
                  >
                     {columns?.map(({ id, format, align }) => {
                        const value = data[id];
                        return (
                           <TableCell key={id} align={align}>
                              {format ? format(value) : value}
                           </TableCell>
                        );
                     })}
                  </TableRow>
               ))}
            </TableBody>
            {paginatedTable && (
               <TableFooter>
                  <TableRow>
                     <TableCell
                        align="right"
                        colSpan={columns?.length}
                        className="p-4 bg-[#FAFAFA]"
                     >
                        <Pagination
                           count={Math.ceil(totalRecords / recordsPerPage)}
                           onChange={handleChangePage}
                           className="float-right"
                        />
                     </TableCell>
                  </TableRow>
               </TableFooter>
            )}
         </Table>
      </TableContainer>
   );
};

export default DataTable;
