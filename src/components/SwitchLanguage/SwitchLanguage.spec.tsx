import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SwitchLanguage from './SwitchLanguage';
import { AppContext } from '../../store';
import ptBr from '../../languages/pt-br.json';

const languageDispatch = {
  dispatch: jest.fn(),
};

describe('SwitchLanguage', () => {
  let switchLanguageButton: HTMLElement;

  beforeEach(() => {
    render(
      <AppContext.Provider
        value={{
          language: {
            state: ptBr,
            ...languageDispatch,
          },
        }}
      >
        <SwitchLanguage />
      </AppContext.Provider>
    );

    switchLanguageButton = screen.getByTestId('switch-language-button');
  });

  it('should switch the language after click', () => {
    /**
     * The preloaded language in this test is "pt-br" (portuguese).
     * So, when the button is clicked it should trigger the 'dispatch()' with the
     * following action. When this action is triggered, the language of the application
     * is changed to english.
     *
     * // TODO: Investigate this further.
     * As we have mocked the dispatch function it will not act as it would. So, it is
     * not possible to test the button's title and aria-label changing to english
     * (without forcing it with a hard code, which I think that is not ideal).
     */
    fireEvent.click(switchLanguageButton);

    expect(languageDispatch.dispatch).toHaveBeenCalledWith({
      type: 'SET_LANGUAGE',
      payload: 'en-us',
    });
  });
});
