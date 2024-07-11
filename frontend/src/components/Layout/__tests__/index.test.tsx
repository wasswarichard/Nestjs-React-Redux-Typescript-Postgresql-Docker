import { render, screen } from '@testing-library/react';
import Layout from '../index.tsx';

describe('Tests for Bread crumbs component', () => {
   it('should successfully render the BreadCrumbs', async () => {
      render(
         <Layout>
            <div data-testid="layout-child">LATEST CANDIDATES</div>
         </Layout>,
      );
      expect(screen.getByTestId('company-logo').textContent).toBe('Candidates');
      expect(screen.getByTestId('layout-child').textContent).toBe('LATEST CANDIDATES');
   });
});
