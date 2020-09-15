import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SwitchLanguage from './SwitchLanguage';
import { AppContext } from '../../store';
import languages from '../../languages';

const languageDispatch = {
  dispatch: jest.fn(),
};

function elementToBeRenderedWithLanguage(lang: 'pt-br' | 'en-us') {
  return (
    <AppContext.Provider
      value={{
        language: {
          state: languages[lang],
          ...languageDispatch,
        },
      }}
    >
      <SwitchLanguage />
    </AppContext.Provider>
  );
}

/**
 * It tests if after the button is clicked it will trigger the 'dispatch()'
 * function and call it with the properly arguments.
 *
 * After, it checks if the button's text and aria-label are okay.
 */
function renderElementWithLanguage(lang: 'pt-br' | 'en-us') {
  const componentLabels = {
    'pt-br': {
      buttonText: 'português',
      buttonAriaLabel:
        'O idioma selecionado é o Português. Clique para alterar para o Inglês.',
    },
    'en-us': {
      buttonText: 'english',
      buttonAriaLabel:
        'The selected language is English. Click to change to Portuguese.',
    },
  };

  const oppositeLang = lang === 'pt-br' ? 'en-us' : 'pt-br';

  const { rerender } = render(elementToBeRenderedWithLanguage(lang));

  let switchLanguageButton: HTMLElement = screen.getByTestId(
    'switch-language-button'
  );

  fireEvent.click(switchLanguageButton);

  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'defaultLanguage',
    oppositeLang
  );

  expect(languageDispatch.dispatch).toHaveBeenCalledTimes(1);
  expect(languageDispatch.dispatch).toHaveBeenCalledWith({
    type: 'SET_LANGUAGE',
    payload: oppositeLang,
  });

  /**
   * Needs to be rerendered because the 'dispatch()' function will not act
   * as it would inside the real component.
   */
  rerender(elementToBeRenderedWithLanguage(oppositeLang));

  let oceanButtonContent: HTMLElement = screen.getByTestId(
    'ocean-button-content'
  );

  expect(oceanButtonContent).toHaveTextContent(
    componentLabels[oppositeLang].buttonText
  );
  expect(
    screen.getByLabelText(componentLabels[oppositeLang].buttonAriaLabel)
  ).toBeInTheDocument();
}

describe('SwitchLanguage', () => {
  beforeEach(() => {
    /**
     * https://medium.com/javascript-in-plain-english/testing-local-storage-with-testing-library-580f74e8805b
     */
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should switch language to english', () =>
    renderElementWithLanguage('pt-br'));

  it('should switch language to portuguese', () =>
    renderElementWithLanguage('en-us'));
});
