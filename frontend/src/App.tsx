import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { fetcher } from './api';
import { UNAUTHORIZED_CODES } from './constants.ts';
import { INDEX_ROUTE_PATH } from './route-paths';
import RoutePaths from './Routes.tsx';
import Layout from './components/Layout';

const App: FC = () => {
   return (
      <BrowserRouter>
         <SWRConfig
            value={{
               fetcher,
               onError: (error) => {
                  if (error && UNAUTHORIZED_CODES.includes(error.status)) {
                     window.location.replace(INDEX_ROUTE_PATH);
                  }
               },
            }}
         >
            <Layout>
               <RoutePaths />
            </Layout>
         </SWRConfig>
      </BrowserRouter>
   );
};

export default App;
