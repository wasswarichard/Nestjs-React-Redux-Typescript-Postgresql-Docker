import './LoadingSpinner.css';

import { FC } from 'react';

interface LoadingSpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = () => {
   return (
      <div className="bouncing-loader mt-20">
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
};

export default LoadingSpinner;
