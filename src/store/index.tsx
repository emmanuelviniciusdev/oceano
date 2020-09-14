/**
 * This is the global store of the application.
 *
 * As we can see we are not using Redux, but using Context API instead.
 *
 * Each reducer (contained inside './reducers') represents a functionality of the application.
 */

import React, {
  createContext,
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useReducer,
} from 'react';
import { LanguageStateType } from '../types/reducers/language';
import { ActionType } from '../types/ReducerTypes';

// Reducers
import languageReducer from './reducers/language';

type AppContextProviderPropsType = {
  children: JSX.Element[] | JSX.Element;
};

/**
 * 'S' represents the type of reducer state
 */
type ReducerType<S> = Reducer<S, ActionType>;

/**
 * 'S' represents the type of reducer state as well
 */
type TransformReducerType<S> = {
  state: ReducerState<ReducerType<S>>;
  dispatch: Dispatch<ReducerAction<ReducerType<S>>>;
};

/**
 * This is what AppContext will return.
 *
 * Everytime we add a new reducer to our global context we have
 * to define its type here.
 */
type AppGlobalContextType = {
  language?: TransformReducerType<LanguageStateType>;
};

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
