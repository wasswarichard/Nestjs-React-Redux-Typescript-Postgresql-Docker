import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickerValidDate, TimePicker } from '@mui/x-date-pickers';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export interface DateRangePickerProps {
   timeIntervals: PickerValidDate[];
   handleChangeTime: (date: string[]) => void;
}
export const DateRangePicker: FC<DateRangePickerProps> = (props) => {
   const { timeIntervals, handleChangeTime } = props;
   const [fromTimeValue, setFromTimeValue] = useState<PickerValidDate | null>(null);
   const [toTimeValue, setToTimeValue] = useState<PickerValidDate | null>(null);

   useEffect(() => {
      if (timeIntervals) {
         const [from, to] = timeIntervals;
         setFromTimeValue(dayjs(new Date(from).toISOString()));
         setToTimeValue(dayjs(new Date(to).toISOString()));
      }
   }, [timeIntervals]);

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['TimePicker', 'TimePicker']}>
            <TimePicker
               label="From"
               value={fromTimeValue}
               onChange={(newValue) => {
                  setFromTimeValue(newValue);
                  handleChangeTime([
                     new Date(fromTimeValue).toISOString(),
                     new Date(toTimeValue).toISOString(),
                  ]);
               }}
            />
            <TimePicker
               label="To"
               value={toTimeValue}
               onChange={(newValue) => {
                  setToTimeValue(newValue);
                  handleChangeTime([
                     new Date(fromTimeValue).toISOString(),
                     new Date(toTimeValue).toISOString(),
                  ]);
               }}
            />
         </DemoContainer>
      </LocalizationProvider>
   );
};
