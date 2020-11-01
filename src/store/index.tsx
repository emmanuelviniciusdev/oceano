/**
 * This is the global store of the application.
 *
 * As we can see we are not using Redux, but using Context API instead.
 *
 * Each reducer (contained inside './reducers') represents a module of the application.
 */

import React, { createContext, useReducer } from 'react';

// Reducers
import languageReducer from './reducers/language';
import userReducer from './reducers/user';
import myNoteReducer from './reducers/myNote';
import topBarReducer from './reducers/topBar';

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
    user: transformReducer(
      useReducer(userReducer.reducer, userReducer.initialState)
    ),
    myNote: transformReducer(
      useReducer(myNoteReducer.reducer, myNoteReducer.initialState)
    ),
    topBar: transformReducer(
      useReducer(topBarReducer.reducer, topBarReducer.initialState)
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
