import { render, screen } from '@testing-library/react';
import React from 'react';
import TermsBox from './TermsBox';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../../hooks/useTranslation', () =>
  jest.fn(() => ({
    titles: {
      'terms-of-use': 'Termos de Uso',
      'privacy-policy': 'Política de Privacidade',
    },
    actionButtons: {
      buttonHomePage: { text: 'página inicial' },
      buttonTermsOfUse: { text: 'termos de uso' },
      buttonPrivacyPolicy: { text: 'política de privacidade' },
    },
  }))
);

describe('TermsBox', () => {
  it("should render children correctly when the component is showing 'terms of use'", () => {
    render(<TermsBox showing="terms-of-use" />);

    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
    expect(screen.getByTestId('button-terms-of-use')).toBeDisabled();
  });

  it("should render children correctly when the component is showing 'privacy policy'", () => {
    render(<TermsBox showing="privacy-policy" />);

    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
    expect(screen.getByTestId('button-privacy-policy')).toBeDisabled();
  });
});
