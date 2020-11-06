import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { render, screen, wait } from '@testing-library/react';
import { AppContext } from '../../store';
import { BreadcrumbsStateType } from '../../types-and-interfaces/store/reducers/breadcrumbs.types';

jest.mock('../../services/item', () => ({
  getBreadcrumbs: jest.fn(),
}));

jest.mock('../../hooks/useTranslation', () =>
  jest.fn(() => ({
    loadingBreadcrumbsMsg: 'carregando...',
    errorLoadingBreadcrumbsMsg: 'ocorreu um erro ao carregar as pastas',
  }))
);

const mockedItemService = require('../../services/item');
const mockedGetBreadcrumbs = mockedItemService.getBreadcrumbs as jest.Mock;

const userState = {
  uid: 'some-hash',
  providerId: 'github.com',
  isEmailVerified: true,
  areTermsAccepted: true,
  email: 'emmanuel@domain.com',
  displayName: 'Emmanuel Vinícius',
};

const breadcrumbsDefaultState = {
  currentFolder: null,
  previousFolders: [null],
};

/**
 * @param folderId The current folder ID
 * @param breadcrumbsState The state of the breadcrumbs context
 */
function BreadcrumbsWithContext(
  folderId: string | null = null,
  breadcrumbsState: BreadcrumbsStateType = breadcrumbsDefaultState
) {
  return (
    <AppContext.Provider
      value={{
        user: {
          state: userState,
          dispatch: jest.fn(),
        },
        breadcrumbs: {
          state: breadcrumbsState,
          dispatch: jest.fn(),
        },
      }}
    >
      <Breadcrumbs folderId={folderId} />
    </AppContext.Provider>
  );
}

describe('Breadcrumbs', () => {
  it('should only render the root folder button correctly', async () => {
    mockedGetBreadcrumbs.mockResolvedValue(breadcrumbsDefaultState);

    await wait(() => {
      render(BreadcrumbsWithContext());
    });

    const breadcrumbsButtonRootFolder = screen.getAllByTestId(
      'breadcrumbs-button-root-folder'
    );

    expect(breadcrumbsButtonRootFolder).toHaveLength(1);
    expect(breadcrumbsButtonRootFolder[0]).toBeInTheDocument();
    expect(breadcrumbsButtonRootFolder[0]).toBeDisabled();
    expect(breadcrumbsButtonRootFolder[0]).toHaveTextContent(
      '[github] Emmanuel Vinícius'
    );

    // screen.debug();
  });

  it('should render all the folder buttons correctly', async () => {
    const breadcrumbsFolders = Array.from({ length: 5 }).map((v, i) => ({
      id: `hash-folder-id-${i}`,
      parentFolderId: `hash-parent-folder-id-${i}`,
      title: `My folder ${i}`,
    }));

    const breadcrumbsState = {
      currentFolder: null,
      previousFolders: [null, ...breadcrumbsFolders],
    };

    mockedGetBreadcrumbs.mockResolvedValue(breadcrumbsState);

    await wait(() => {
      render(BreadcrumbsWithContext(null, breadcrumbsState));
    });

    const breadcrumbsButtonRootFolder = screen.getAllByTestId(
      'breadcrumbs-button-root-folder'
    );

    /**
     * Root folder button tests
     */
    expect(breadcrumbsButtonRootFolder).toHaveLength(1);
    expect(breadcrumbsButtonRootFolder[0]).not.toBeDisabled();
    expect(breadcrumbsButtonRootFolder[0]).toHaveTextContent(
      '[github] Emmanuel Vinícius'
    );

    /**
     * Normal folder button tests
     */
    expect(
      screen.getAllByTestId('breadcrumbs-button-normal-folder')
    ).toHaveLength(5);

    breadcrumbsFolders.forEach((folder, folderIndex, foldersArray) => {
      const currentFolder = screen.getByText(folder.title);

      /**
       * Last folder button must be disabled
       */
      if (folderIndex + 1 === foldersArray.length) {
        expect(currentFolder).toBeDisabled();
      } else {
        expect(currentFolder).not.toBeDisabled();
      }

      expect(currentFolder).toBeInTheDocument();
      expect(currentFolder).toHaveTextContent(folder.title);
    });

    // screen.debug();
  });

  it('should render the loading indicator while getBreadcrumbs() is not resolved yet', async () => {
    mockedGetBreadcrumbs.mockResolvedValue(() => breadcrumbsDefaultState);

    const { rerender } = render(BreadcrumbsWithContext());

    expect(screen.getByText('carregando...')).toBeInTheDocument();

    /**
     * Rerender to remove the "a test was not wrapped in act(...)" waning.
     */
    await wait(() => {
      rerender(BreadcrumbsWithContext());
    });
  });

  it('should render an error message when getBreadcrumbs() is rejected', async () => {
    mockedGetBreadcrumbs.mockRejectedValue(null);

    await wait(() => {
      render(BreadcrumbsWithContext());
    });

    expect(
      screen.getByText('ocorreu um erro ao carregar as pastas')
    ).toBeInTheDocument();
  });
});
