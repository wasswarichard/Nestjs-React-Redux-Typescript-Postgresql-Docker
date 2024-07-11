import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../index.tsx';

describe('Tests for Bread crumbs component', () => {
   it('should successfully render the BreadCrumbs', async () => {
      const data = [];
      render(<Breadcrumbs data={data} />);
      const element = screen.getByTestId('bread-crumb');
      expect(element).toBeInTheDocument();
   });
});
