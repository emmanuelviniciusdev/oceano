import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { render, screen } from '@testing-library/react';
import { AppContext } from '../../store';

jest.mock('../../services/item', () => jest.fn());

const userState = {
  uid: 'some-hash',
  providerId: 'github.com',
  isEmailVerified: true,
  areTermsAccepted: true,
  email: 'emmanuel@domain.com',
  displayName: 'Emmanuel Vinícius',
};

describe('Breadcrumbs', () => {
  it('should render the user name and the name of the provider to which user is signed in', () => {
    render(
      <AppContext.Provider
        value={{
          user: {
            state: userState,
            dispatch: jest.fn(),
          },
        }}
      >
        <Breadcrumbs />
      </AppContext.Provider>
    );

    expect(screen.getByText('[github] Emmanuel Vinícius')).toBeInTheDocument();
  });
});
