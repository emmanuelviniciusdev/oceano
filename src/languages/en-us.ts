import { LanguageStateType } from '../types/reducers/language';

const content: LanguageStateType = {
  default: 'en-us',

  language: 'english',

  /**
   * {NameOfTheComponent: {...}}
   */
  translations: {
    ButtonSignInWithGoogle: {
      text: 'Sign in with <b>Google</b>',
      altImg: "Google's logo",
    },

    ButtonSignInWithMicrosoft: {
      text: 'Sign in with <b>Microsoft</b>',
      altImg: "Microsoft's logo",
    },

    TopBar: {
      buttonCreateNote: {
        text: 'create a note',
      },
      buttonSignOut: {
        text: 'leave',
        ariaLabel: 'sign out from oceano',
      },
      inputSearch: {
        placeholder: 'trying to find something?',
      },
    },

    IndexPage: {
      presentation: {
        paragraph1:
          'your notes <b>saved</b> in the depths of the <b>unexplored</b>.',
        paragraph2:
          "it's time to <b>say goodbye</b> to your old paper notes and <b>say hello</b> to the <b>oceano.</b>",
        paragraph3: '<b>try it</b>.',
      },
      signIn: {
        title: 'sign in',
      },
    },

    NotesPage: {
      pageTitle: 'my notes',
    },

    NotFoundPage: {
      pageTitle: 'page not found',
      h1: 'the page was not found',
      h2: 'are you lost, sailor?',
      buttonReturn: {
        text: 'return',
      },
    },
  },
};

export default content;
