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
      modalDeleteNote: {
        title: 'are you sure?',
        actionText:
          'This note will be permanently deleted and this action has no return. Do you wish to continue?',
        buttonConfirmDelete: {
          text: 'yes, delete',
        },
      },
      signOutErrorMsg: 'error while trying to leave the oceano',
      createNoteErrorMsg: 'error creating note',
      deleteNoteErrorMsg: 'error deleting note',
    },

    Breadcrumbs: {
      loadingBreadcrumbsMsg: 'loading...',
      errorLoadingBreadcrumbsMsg: 'there was an error loading the folders',
      folderDefaultTitle: 'my new folder...',
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
        actions: {
          buttonCreateNewFolder: {
            text: 'create new folder',
          },
          buttonMoveIntoFolder: {
            text: 'move into the folder',
          },
          buttonSwapItems: {
            text: 'change places',
          },
        },
      },
      actionDeleteModalLabels: {
        deletingNote: {
          title: 'delete note',
          actionText:
            'You are about to permanently delete a note. This action has no return. Do you wish to continue?',
          buttonConfirmDelete: {
            text: 'yes, delete',
          },
        },
        deletingFolder: {
          title: 'delete folder',
          actionText:
            'You are about to permanently delete a folder and all of its contents. This action has no return. Do you wish to continue?',
          buttonConfirmDelete: {
            text: 'yes, delete',
          },
        },
      },
      actionContextmenuLabels: {
        openInNewTab: 'open in new tab',
        renameNote: 'rename note',
        deleteNote: 'delete note',
        renameFolder: 'rename folder',
        deleteFolder: 'delete folder',
      },
      actionCreateNewFolderModalLabels: {
        title: 'give the folder a name',
        actions: {
          inputFolderTitle: {
            placeholder: 'folder name',
          },
          buttonCreateNewFolder: {
            text: 'create new folder',
          },
        },
      },
      buttonSaveEditTitle: {
        text: 'save',
      },
      errorCreatingNewFolderMsg: 'error creating new folder',
      errorChangePlacesMsg: 'an error occurred while changing places',
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

    TermsBox: {
      titles: {
        'terms-of-use': 'Terms of Use',
        'privacy-policy': 'Privacy Policy',
      },
      actionButtons: {
        buttonHomePage: { text: 'home page' },
        buttonTermsOfUse: { text: 'terms of use' },
        buttonPrivacyPolicy: { text: 'privacy policy' },
      },
    },

    NotesAndFolders: {
      errorLoadingItemsMsg: (username: string) =>
        `Very sorry, ${username}. There was an error loading your notes.`,
      loadingItemsMsg: 'loading...',
      boxNoResults: {
        title: '<b>no results</b>',
        text: 'found for the search term within this folder',
        image: {
          alt: 'Crying sea horse. Its color is a golden hue with black spots.',
        },
      },
      boxNoCreatedNotes: {
        title: (username: string) => `Hi, <b>${username}!</b>`,
        text: `to create a note, click on the "<b>create a note</b>" button,
        located just above...`,
        image: {
          alt: 'octopus',
        },
      },
    },

    Footer: {
      termsOfUseText: 'terms of use',
      privacyPolicyText: 'privacy policy',
      mobileContent: {
        versionText: 'version',
        goToText: 'go to...',
      },
      content: {
        versionText: 'independent production - version',
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

    MyNotePage: {
      folderDefaultTitle: 'my new folder...',
      rootFolderTitle: 'default',
      errorLoadingNoteDocumentData: {
        text: 'aah, there was an error trying to load your note',
        buttonReturn: {
          text: 'return',
        },
      },
    },

    TermsPage: {
      'termos-de-uso': {
        pageTitle: 'terms of use',
      },
      'politica-de-privacidade': {
        pageTitle: 'privacy policy',
      },
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
