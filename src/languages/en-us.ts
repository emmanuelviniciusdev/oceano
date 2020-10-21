import { LanguageStateType } from '../types-and-interfaces/store/reducers/language.types';

const content: LanguageStateType = {
  default: 'en-us',

  language: 'english',

  /**
   * {NameOfTheComponent: {...}}
   */
  translations: {
    SignInMethods: {
      unknownSignInErrorMsg: `error signing in using`,
      accountExistsWithThisEmailErrorMsg: (email: string) =>
        `<b>${email}</b> has already been registered in the oceano with another login method`,
      warningEmailVerificationMsg: (method: string) =>
        `an account confirmation link has been sent to your <b>${method}</b> email address`,
    },

    ButtonSignInWithGoogle: {
      text: 'Sign in with <b>Google</b>',
      altImg: "Google's logo",
    },

    ButtonSignInWithGithub: {
      text: 'Sign in with <b>Github</b>',
      altImg: "Github's logo",
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
      buttonReturnFromMyNotePage: {
        text: 'return',
      },
      buttonDeleteFromMyNotePage: {
        text: 'delete',
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
      actionDnDModalLabels: {
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
      actionDeleteModalLabels: {
        deletingNote: {
          title: 'delete note',
          actionText:
            'You are about to permanently delete a note. This action has no return. Do you wish to continue?',
          buttonConfirmDelete: {
            text: 'yes, delete it',
          },
        },
        deletingFolder: {
          title: 'delete folder',
          actionText:
            'You are about to permanently delete a folder and all of its contents. This action has no return. Do you wish to continue?',
          buttonConfirmDelete: {
            text: 'yes, delete it',
          },
        },
      },
      actionContextmenuLabels: {
        renameNote: 'rename note',
        deleteNote: 'delete note',
        renameFolder: 'rename folder',
        deleteFolder: 'delete folder',
      },
      buttonSaveEditTitle: {
        text: 'save',
      },
    },

    MyNote: {
      textareaTitle: {
        placeholder: 'title',
      },
      statusIndicator: {
        oceanoAutosavesText: 'oceano autosaves your note',
        savingText: 'saving...',
      },
    },

    AcceptanceOfTerms: {
      'terms-of-use': {
        title: 'Terms of Use',
      },
      'privacy-policy': {
        title: 'Privacy Policy',
      },
      buttonNext: {
        text: 'next',
      },
      buttonReturn: {
        text: 'return',
      },
      buttonCreateAccount: {
        text: 'create account with',
      },
      buttonClose: {
        title: 'close',
      },
      notAuthenticatedUserErrorMsg: 'you are not authenticated',
      finishingSignUpErrorMsg:
        'there was an error completing the account creation',
      termsAcceptanceText:
        'I have read and accept the <b>terms of use</b> and <b>privacy policy</b>',
      modalEmailVerification: {
        title: 'account verification',
        text: (method: string) =>
          `A link to confirm the authenticity of your account has been sent to your ${method} email.`,
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

    OfflinePage: {
      pageTitle: 'offline',
      imgTurtle: {
        alt: 'a turtle with three bubbles, of different sizes, above its head',
      },
      h1: "you're offline",
      h2: 'trying to reconnect...',
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
