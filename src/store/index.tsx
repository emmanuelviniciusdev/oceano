/**
 * This is the global store of the application.
 *
 * As we can see we are not using Redux, but using Context API instead.
 *
 * Each reducer (contained inside './reducers') represents a functionality of the application.
 */

import React, { createContext, useReducer } from 'react';

// Reducers
import languageReducer from './reducers/language';

// Types
import {
  AppContextProviderPropsType,
  AppGlobalContextType,
} from '../types-and-interfaces/store/general.types';

export const AppContext = createContext<AppGlobalContextType>({});

export function AppContextProvider({ children }: AppContextProviderPropsType) {
  const store: AppGlobalContextType = {
    language: transformReducer(
      useReducer(languageReducer.reducer, languageReducer.initialState)
    ),
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

/**
 * It transforms the return of 'useReducer' into an object.
 *
 * @param reducer
 */
function transformReducer(reducer: [any, any]) {
  return { state: reducer[0], dispatch: reducer[1] };
}
