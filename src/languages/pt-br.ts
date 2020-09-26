import { LanguageStateType } from '../types-and-interfaces/store/reducers/language.types';

const content: LanguageStateType = {
  default: 'pt-br',

  language: 'português',

  /**
   * {NameOfTheComponent: {...}}
   */
  translations: {
    ButtonSignInWithGoogle: {
      text: 'Entrar usando o <b>Google</b>',
      altImg: 'Logo da Google',
    },

    ButtonSignInWithMicrosoft: {
      text: 'Entrar usando a <b>Microsoft</b>',
      altImg: 'Logo da Microsoft',
    },

    TopBar: {
      buttonCreateNote: {
        text: 'criar uma nota',
      },
      buttonSignOut: {
        text: 'sair',
        ariaLabel: 'sair do oceano',
      },
      inputSearch: {
        placeholder: 'procurando algo?',
      },
    },

    Breadcrumbs: {
      homeButton: {
        text: 'início',
      },
    },

    IndexPage: {
      presentation: {
        paragraph1:
          'suas anotações <b>salvas</b> nas profundezas do <b>inexplorável.</b>',
        paragraph2:
          'diga <b>adeus</b> às suas antigas notinhas de papel e dê um <b>olá</b> ao <b>oceano.</b>',
        paragraph3: '<b>experimente.</b>',
      },
      signIn: {
        title: 'iniciar sessão',
      },
    },

    NotesPage: {
      pageTitle: 'minhas notas',
    },

    NotFoundPage: {
      pageTitle: 'página não encontrada',
      h1: 'página não encontrada',
      h2: 'perdido, marinheiro?',
      buttonReturn: {
        text: 'retornar',
      },
    },
  },
};

export default content;
