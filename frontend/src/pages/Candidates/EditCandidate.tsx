import AddCandidate from './AddCandidate.tsx';
import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { getInterporatedPath } from '../../utils';
import { GET_CANDIDATE_ENDPOINT_PATH } from '../../endpoint-paths';
import { useParams } from 'react-router-dom';

const EditCandidate: FunctionComponent = () => {
   const { id } = useParams();
   const { data } = useSWR(getInterporatedPath(GET_CANDIDATE_ENDPOINT_PATH, { id }));
   return <AddCandidate candidate={data} />;
};
export default EditCandidate;
