import { render, screen } from '@testing-library/react';
import React from 'react';
import TopBar from './TopBar';
import { AppContext } from '../../store';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../hooks/useTranslation', () =>
  jest.fn(() => ({
    buttonCreateNote: {
      text: 'criar uma nota',
    },
    buttonSignOut: {
      text: 'sair',
      ariaLabel: 'sair do oceano',
    },
    inputSearch: {
      placeholder: 'procurando algo?',
    },
    buttonReturnFromMyNotePage: {
      text: 'voltar',
    },
    buttonDeleteFromMyNotePage: {
      text: 'deletar',
    },
  }))
);

jest.mock('../../services/auth', () => jest.fn());
jest.mock('../../services/note', () => jest.fn());
jest.mock('../../helpers/noteAndFolder', () => jest.fn());

describe('TopBar', () => {
  it("should render the proper buttons when the router path is from 'my note' page", () => {
    (useLocation as jest.Mock).mockImplementation(() => ({
      pathname: '/minha-nota/some-firebase-hash',
    }));

    render(
      <AppContext.Provider
        value={{
          language: {
            state: {
              default: 'pt-br',
              language: 'português',
              translations: {},
            },
            dispatch: jest.fn(),
          },
        }}
      >
        <TopBar />
      </AppContext.Provider>
    );

    expect(screen.queryByText('criar uma nota')).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('procurando algo?')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('português')).not.toBeInTheDocument();
    expect(screen.queryByText('sair')).not.toBeInTheDocument();

    expect(screen.queryByText('voltar')).toBeInTheDocument();
    expect(screen.queryByText('deletar')).toBeInTheDocument();
  });

  it('should not render TopBar on blocked routes', () => {
    const blockedRoutes = [
      '/pagina-nao-encontrada',
      '/offline',
      '/termos/termos-de-uso',
    ];

    blockedRoutes.forEach((pathname) => {
      (useLocation as jest.Mock).mockImplementation(() => ({
        pathname,
      }));
      render(<TopBar />);
      expect(screen.queryByTestId('oceano-topbar')).not.toBeInTheDocument();
    });
  });
});
