import { Dispatch, Reducer, ReducerAction, ReducerState } from 'react';
import { ActionType } from './reducers/general.types';
import { LanguageStateType } from './reducers/language.types';
import { UserStateType } from './reducers/user.types';

export type AppContextProviderPropsType = {
  children: JSX.Element[] | JSX.Element;
};

/**
 * 'S' represents the type of reducer state
 */
export type ReducerType<S> = Reducer<S, ActionType>;

/**
 * 'S' represents the type of reducer state as well
 */
export type TransformReducerType<S> = {
  state: ReducerState<ReducerType<S>>;
  dispatch: Dispatch<ReducerAction<ReducerType<S>>>;
};

/**
 * This is what AppContext will return.
 *
 * Everytime we add a new reducer to our global context we have
 * to define its type here.
 */
export type AppGlobalContextType = {
  language?: TransformReducerType<LanguageStateType>;
  user?: TransformReducerType<UserStateType>;
};
