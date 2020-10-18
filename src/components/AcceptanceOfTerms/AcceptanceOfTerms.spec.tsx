import {
  cleanup,
  fireEvent,
  render,
  screen,
  wait,
} from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { registerUser } from '../../services/user';
import { AppContext } from '../../store';
import AcceptanceOfTerms from './AcceptanceOfTerms';

jest.mock('../../hooks/useTranslation', () => {
  return jest.fn(() => ({
    'terms-of-use': {
      title: 'Termos de Uso',
    },
    'privacy-policy': {
      title: 'Política de Privacidade',
    },
    buttonNext: {
      text: 'próximo',
    },
    buttonReturn: {
      text: 'voltar',
    },
    buttonCreateAccount: {
      text: 'criar conta usando',
    },
    buttonClose: {
      title: 'fechar',
    },
  }));
});

const mockedRegisterUser = jest.fn(() => Promise.resolve());

jest.mock('../../services/user', () =>
  jest.fn(() => ({
    registerUser: mockedRegisterUser,
  }))
);

describe('AcceptanceOfTerms', () => {
  beforeEach(() => {
    render(
      <AppContext.Provider
        value={{
          user: {
            state: {
              uid: 'uid-hash',
              displayName: 'Tracy',
              email: 'tracy@domain.com',
            },
            dispatch: jest.fn(),
          },
        }}
      >
        <AcceptanceOfTerms authType="microsoft" />
      </AppContext.Provider>
    );
  });

  it('should render terms of use on the first rendering', () => {
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
    expect(screen.getByText('próximo')).toBeInTheDocument();
    // screen.debug();
  });

  it('should render privacy policy when click on the next button', () => {
    fireEvent.click(screen.getByText('próximo'));

    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
    expect(
      screen.getByText('criar conta usando microsoft')
    ).toBeInTheDocument();
    expect(screen.getByText('voltar')).toBeInTheDocument();

    // screen.debug();
  });

  it('should close the modal when click on the close button', () => {
    cleanup();

    let isOpen = true;

    const { rerender } = render(
      isOpen && (
        <AcceptanceOfTerms
          authType="microsoft"
          onClose={() => (isOpen = false)}
        />
      )
    );

    fireEvent.click(screen.getByTestId('close-button'));

    /**
     * When we fired one click to 'close-button' the component triggered 'onClose' callback.
     * This callback was responsible for setting 'isOpen' to false, and as 'isOpen' is false,
     * the component will not be rendered again.
     */
    rerender(
      isOpen && (
        <AcceptanceOfTerms
          authType="microsoft"
          onClose={() => (isOpen = false)}
        />
      )
    );

    expect(
      screen.queryByTestId('modal-acceptance-of-terms')
    ).not.toBeInTheDocument();

    // screen.debug();
  });
});
