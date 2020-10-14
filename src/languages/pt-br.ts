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
      buttonReturnFromMyNotePage: {
        text: 'voltar',
      },
      buttonDeleteFromMyNotePage: {
        text: 'deletar',
      },
    },

    Breadcrumbs: {
      homeButton: {
        text: 'início',
      },
    },

    NoteOrFolder: {
      defaultTitles: {
        note: 'clique para começar a editar...',
        folder: 'minha nova pasta...',
      },
      actionDnDModalLabels: {
        title: 'o que você deseja fazer?',
        actionTexts: {
          'dropping-note-over-note':
            '* você acabou de mover uma nota para cima de outra nota',
          'dropping-note-over-folder':
            '* você acabou de mover uma nota para cima de uma pasta',
          'dropping-folder-over-folder':
            '* você acabou de mover uma pasta para cima de outra pasta',
          'dropping-folder-over-note':
            '* você acabou de mover uma pasta para cima de uma nota',
        },
      },
      actionDeleteModalLabels: {
        deletingNote: {
          title: 'deletar nota',
          actionText:
            'Você está prestes a deletar permanentemente uma nota. Esta ação não tem mais volta. Deseja continuar?',
          buttonConfirmDelete: {
            text: 'sim, deletar',
          },
        },
        deletingFolder: {
          title: 'deletar pasta',
          actionText:
            'Você está prestes a deletar permanentemente uma pasta e todo seu conteúdo. Esta ação não tem mais volta. Deseja continuar?',
          buttonConfirmDelete: {
            text: 'sim, deletar',
          },
        },
      },
      actionContextmenuLabels: {
        renameNote: 'renomear nota',
        deleteNote: 'deletar nota',
        renameFolder: 'renomear pasta',
        deleteFolder: 'deletar pasta',
      },
      buttonSaveEditTitle: {
        text: 'salvar',
      },
    },

    MyNote: {
      textareaTitle: {
        placeholder: 'título',
      },
      statusIndicator: {
        oceanoAutosavesText: 'o oceano salva automaticamente as suas anotações',
        savingText: 'salvando...',
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
