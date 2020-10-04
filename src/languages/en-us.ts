import { LanguageStateType } from '../types-and-interfaces/store/reducers/language.types';

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

    Breadcrumbs: {
      homeButton: {
        text: 'home',
      },
    },

    NoteOrFolder: {
      defaultTitles: {
        note: 'click to start editing...',
        folder: 'my new folder...',
      },

      actionModalLabels: {
        title: 'what do you want to do?',
        actionTexts: {
          'dropping-note-over-note':
            '* you just moved a note on top of another note',
          'dropping-note-over-folder': '* you just moved a note over a folder',
          'dropping-folder-over-folder':
            '* you just moved a folder on top of another folder',
          'dropping-folder-over-note': '* you just moved a folder over a note',
        },
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
