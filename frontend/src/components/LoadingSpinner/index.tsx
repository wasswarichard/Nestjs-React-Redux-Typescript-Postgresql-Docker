import './LoadingSpinner.css';

import { FC } from 'react';

interface LoadingSpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = () => {
   return (
      <div className="bouncing-loader mt-20" data-testid="loading-spinner">
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
};

export default LoadingSpinner;
