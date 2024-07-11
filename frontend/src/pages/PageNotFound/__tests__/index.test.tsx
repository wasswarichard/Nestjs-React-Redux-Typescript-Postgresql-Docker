import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../index.tsx';

describe('Tests for Bread crumbs component', () => {
   it('should successfully render the BreadCrumbs', async () => {
      render(
         <Router>
            <PageNotFound />
         </Router>,
      );
      const element = screen.getByText('Page not found');
      expect(element).toBeInTheDocument();
   });
});
