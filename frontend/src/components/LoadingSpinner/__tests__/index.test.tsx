import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../index.tsx';

describe('Tests for Bread crumbs component', () => {
   it('should successfully render the BreadCrumbs', async () => {
      render(<LoadingSpinner />);
      const element = screen.getByTestId('loading-spinner');
      expect(element).toBeInTheDocument();
   });
});
