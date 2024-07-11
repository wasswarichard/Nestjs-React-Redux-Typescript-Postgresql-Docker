import { FunctionComponent, useEffect, useState } from 'react';
import {
   ADD_CANDIDATE_ROUTE_PATH,
   INDEX_ROUTE_PATH,
   CANDIDATES_ROUTE_PATH,
   EDIT_CANDIDATE_ROUTE_PATH,
} from '../../route-paths';
import { Grid, TextField, Typography } from '@mui/material';
import Breadcrumbs from '../../components/breadcrumbs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { patch, post } from '../../api';
import {
   CREATE_CANDIDATES_ENDPOINT_PATH,
   UPDATE_CANDIDATE_ENDPOINT_PATH,
} from '../../endpoint-paths';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { ICandidate } from '../../types';
import { getInterporatedPath } from '../../utils';
import { DateRangePicker } from '../../components/DateRangePicker.tsx';

const validationSchema = yup.object({
   firstname: yup.string().required('First Name is required'),
   lastname: yup.string().required('Last Name is required'),
   email: yup.string().email().required('Email is required'),
   comment: yup.string().required('Comment is required'),
   phoneNumber: yup.string().nullable(),
   timeInterval: yup.array().of(yup.string()).nullable(),
   linkedin: yup.string().nullable(),
   github: yup.string().nullable(),
});

interface AddCandidateProps {
   candidate?: ICandidate;
}
const AddCandidate: FunctionComponent<AddCandidateProps> = (props) => {
   const { candidate } = props;
   const navigate = useNavigate();
   const [submittingCandidate, setSubmittingCandidate] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string>('');

   const breadcrumbs = [
      { label: 'Explorer', navigateTo: INDEX_ROUTE_PATH },
      { label: 'Candidate', navigateTo: CANDIDATES_ROUTE_PATH },
      candidate?.email
         ? {
              label: 'Edit',
              navigateTo: getInterporatedPath(EDIT_CANDIDATE_ROUTE_PATH, { id: candidate.id }),
           }
         : { label: 'create', navigateTo: ADD_CANDIDATE_ROUTE_PATH },
   ];

   const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
      getValues,
      setValue,
   } = useForm({
      defaultValues: {
         firstname: '',
         lastname: '',
         email: '',
         comment: '',
         phoneNumber: null,
         timeInterval: null,
         linkedin: null,
         github: null,
      },
      resolver: yupResolver(validationSchema),
   });

   useEffect(() => {
      if (candidate && candidate.email) {
         reset({ ...candidate });
      }
   }, [candidate]);

   const onSubmit = async (data: yup.InferType<typeof validationSchema>) => {
      setSubmittingCandidate(true);
      try {
         const response = candidate?.email
            ? await patch(
                 getInterporatedPath(UPDATE_CANDIDATE_ENDPOINT_PATH, { id: candidate.id }),
                 { ...data },
              )
            : await post(CREATE_CANDIDATES_ENDPOINT_PATH, { ...data });
         if ([200, 201].includes(response.status)) {
            setSubmittingCandidate(false);
            setErrorMessage('');
            navigate(CANDIDATES_ROUTE_PATH);
         }
      } catch (error) {
         setSubmittingCandidate(false);
         // @ts-ignore
         setErrorMessage(error?.response?.data?.message);
      }
   };

   return (
      <div className="w-full">
         <div>
            <Breadcrumbs data={breadcrumbs} />
         </div>
         <div className="w-full mt-4">
            <Typography variant="h6">{candidate?.email ? 'Edit' : 'Create'} Candidate</Typography>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">First Name</Typography>
                  <TextField
                     {...register('firstname')}
                     name="firstname"
                     fullWidth
                     id="firstname"
                     error={!!errors?.firstname}
                     helperText={errors?.firstname?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">Last Name</Typography>
                  <TextField
                     {...register('lastname')}
                     name="lastname"
                     fullWidth
                     id="lastname"
                     error={!!errors?.lastname}
                     helperText={errors?.lastname?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">Email</Typography>
                  <TextField
                     type="email"
                     {...register('email')}
                     autoComplete="email"
                     name="email"
                     fullWidth
                     id="email"
                     error={!!errors?.email}
                     helperText={errors?.email?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">Comment</Typography>
                  <TextField
                     {...register('comment')}
                     name="comment"
                     fullWidth
                     id="comment"
                     error={!!errors?.comment}
                     helperText={errors?.comment?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">Github Link</Typography>
                  <TextField
                     {...register('github')}
                     name="github"
                     fullWidth
                     id="github"
                     error={!!errors?.github}
                     helperText={errors?.github?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography className="mb-1">Phone Number</Typography>
                  <TextField
                     {...register('phoneNumber')}
                     name="phoneNumber"
                     fullWidth
                     id="phoneNumber"
                     error={!!errors?.phoneNumber}
                     helperText={errors?.phoneNumber?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6} className="mt-2">
                  <Typography>Linkedin Link</Typography>
                  <TextField
                     {...register('linkedin')}
                     name="linkedin"
                     fullWidth
                     id="linkedin"
                     error={!!errors?.linkedin}
                     helperText={errors?.linkedin?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Typography>Time Interval</Typography>
                  <DateRangePicker
                     timeIntervals={getValues('timeInterval')}
                     handleChangeTime={(value) => {
                        setValue('timeInterval', value);
                     }}
                  />
               </Grid>
            </Grid>
            <div className="flex items-center justify-center">
               <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  loading={submittingCandidate}
               >
                  {candidate?.email ? 'Edit' : 'Add'} Candidate
               </LoadingButton>
            </div>
            <div className="flex items-center justify-center">
               {errorMessage && (
                  <>
                     <p className="text-center text-red-600"> {errorMessage} </p>
                  </>
               )}
            </div>
         </form>
      </div>
   );
};
export default AddCandidate;
