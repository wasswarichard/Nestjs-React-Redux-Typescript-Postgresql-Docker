import { FC, Fragment, lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
   ADD_CANDIDATE_ROUTE_PATH,
   CANDIDATES_ROUTE_PATH,
   EDIT_CANDIDATE_ROUTE_PATH,
   INDEX_ROUTE_PATH,
   VIEW_CANDIDATE_ROUTE_PATH,
} from './route-paths';

// candidates pages
const IndexPage = lazy(() => import('./pages/Candidates'));
const CreateCandidatePage = lazy(() => import('./pages/Candidates/AddCandidate.tsx'));
const ViewCandidatePage = lazy(() => import('./pages/Candidates/CandidateDetails.tsx'));
const EditCandidatePage = lazy(() => import('./pages/Candidates/EditCandidate.tsx'));

//page not found page
const NotFoundPage = lazy(() => import('./pages/PageNotFound'));

const RoutePaths: FC = () => {
   return (
      <Fragment>
         <Suspense fallback={<LoadingSpinner />}>
            <Routes>
               <Route path={INDEX_ROUTE_PATH} element={<Navigate to={CANDIDATES_ROUTE_PATH} />} />
               <Route path={CANDIDATES_ROUTE_PATH} element={<IndexPage />} />
               <Route path={ADD_CANDIDATE_ROUTE_PATH} element={<CreateCandidatePage />} />
               <Route path={VIEW_CANDIDATE_ROUTE_PATH} element={<ViewCandidatePage />} />
               <Route path={EDIT_CANDIDATE_ROUTE_PATH} element={<EditCandidatePage />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </Suspense>
      </Fragment>
   );
};

export default RoutePaths;
