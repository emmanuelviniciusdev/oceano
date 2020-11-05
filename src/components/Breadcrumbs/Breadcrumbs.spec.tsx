import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { render, screen, waitForElement } from '@testing-library/react';
import { AppContext } from '../../store';
import { BreadcrumbsStateType } from '../../types-and-interfaces/store/reducers/breadcrumbs.types';

jest.mock('../../services/item', () => ({
  getBreadcrumbs: jest.fn(),
}));

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

/**
 * @param folderId The current folder ID
 * @param breadcrumbsState The state of the breadcrumbs context
 */
function renderBreadcrumbsWithContext(
  folderId: string | null,
  breadcrumbsState: BreadcrumbsStateType
) {
  render(
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
  it('should only render the root folder button correctly', () => {
    const breadcrumbsState = {
      currentFolder: null,
      previousFolders: [null],
    };

    mockedGetBreadcrumbs.mockResolvedValue(breadcrumbsState);

    waitForElement(() => {
      renderBreadcrumbsWithContext(null, breadcrumbsState);
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

  it('should render all the folder buttons correctly', () => {
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

    waitForElement(() => {
      renderBreadcrumbsWithContext(null, breadcrumbsState);
    });

    screen.debug();
  });
});
