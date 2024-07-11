import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ErrorMessage from '../index';

describe('Tests for ErrorMessage component', () => {
   it('should successfully render the ErrorMessage', async () => {
      render(<ErrorMessage />);
      const element = screen.getByTestId('error-message');
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe('Something went wrong. Please try again.');
   });
});
