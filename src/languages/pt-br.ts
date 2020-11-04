import { LanguageStateType } from '../types-and-interfaces/store/reducers/language.types';

const content: LanguageStateType = {
  default: 'pt-br',

  language: 'português',

  /**
   * {NameOfTheComponent: {...}}
   */
  translations: {
    SignInMethods: {
      unknownSignInErrorMsg: `erro ao iniciar sessão usando`,
      accountExistsWithThisEmailErrorMsg: (email: string) =>
        `<b>${email}</b> já foi registrado no oceano com outro método de login`,
      warningEmailVerificationMsg: (method: string) =>
        `um link de confirmação de conta foi enviado para o seu endereço de e-mail da(o) <b>${method}</b>`,
    },

    ButtonSignInWithGoogle: {
      text: 'Entrar usando a <b>Google</b>',
      altImg: 'Logo da Google',
    },

    ButtonSignInWithGithub: {
      text: 'Entrar usando o <b>Github</b>',
      altImg: 'Logo do Github',
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
      modalDeleteNote: {
        title: 'tem certeza?',
        actionText:
          'Esta nota será permanentemente excluída e esta ação não tem mais volta. Deseja continuar?',
        buttonConfirmDelete: {
          text: 'sim, deletar',
        },
      },
      signOutErrorMsg: 'erro ao tentar sair do oceano',
      createNoteErrorMsg: 'erro ao criar nota',
      deleteNoteErrorMsg: 'erro ao deletar nota',
    },

    Breadcrumbs: {},

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
        actions: {
          buttonCreateNewFolder: {
            text: 'criar nova pasta',
          },
          buttonMoveIntoFolder: {
            text: 'mover para dentro da pasta',
          },
          buttonSwapItems: {
            text: 'trocar de lugar',
          },
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
      actionCreateNewFolderModalLabels: {
        title: 'dê um nome à pasta',
        actions: {
          inputFolderTitle: {
            placeholder: 'nome da pasta',
          },
          buttonCreateNewFolder: {
            text: 'criar nova pasta',
          },
        },
      },
      buttonSaveEditTitle: {
        text: 'salvar',
      },
      errorCreatingNewFolderMsg: 'erro ao criar nova pasta',
    },

    MyNote: {
      textareaTitle: {
        placeholder: 'título',
      },
      statusIndicator: {
        oceanoAutosavesText: 'o oceano salva automaticamente as suas anotações',
        savingText: 'salvando...',
      },
      errorLoadingNoteDocumentData: {
        text: 'aaah, ocorreu um erro ao tentar carregar a sua nota',
        buttonReturn: {
          text: 'voltar',
        },
      },
    },

    AcceptanceOfTerms: {
      'terms-of-use': {
        title: 'Termos de Uso',
      },
      'privacy-policy': {
        title: 'Política de Privacidade',
      },
      buttonNext: {
        text: 'próximo',
      },
      buttonReturn: {
        text: 'voltar',
      },
      buttonCreateAccount: {
        text: 'criar conta usando',
      },
      buttonClose: {
        title: 'fechar',
      },
      notAuthenticatedUserErrorMsg: 'usuário não autenticado',
      finishingSignUpErrorMsg: 'erro ao finalizar a criação da conta',
      termsAcceptanceText:
        'li e aceito os <b>termos de uso</b> e a <b>política de privacidade</b>',
      modalEmailVerification: {
        title: 'confirmação de conta',
        text: (method: string) =>
          `Um link para confirmar a autenticidade de sua conta foi enviado para o seu e-mail da(o) ${method}.`,
      },
    },

    TermsBox: {
      titles: {
        'terms-of-use': 'Termos de Uso',
        'privacy-policy': 'Política de Privacidade',
      },
      actionButtons: {
        buttonHomePage: { text: 'página inicial' },
        buttonTermsOfUse: { text: 'termos de uso' },
        buttonPrivacyPolicy: { text: 'política de privacidade' },
      },
    },

    NotesAndFolders: {
      errorLoadingItemsMsg: (username: string) =>
        `Mil perdões, ${username}. Ocorreu um erro ao carregar suas notas.`,
      loadingItemsMsg: 'carregando...',
      boxNoResults: {
        title: '<b>nenhum resultado</b>',
        text: 'encontrado para o termo procurado dentro desta pasta',
        image: {
          alt:
            'Cavalo-marinho chorando. Sua cor é de uma tonalidade dourada com pintinhas pretas.',
        },
      },
      boxNoCreatedNotes: {
        title: (username?: string) => `Olá, <b>${username}!</b>`,
        text: `para criar uma nota, clique no botão "<b>criar uma nota</b>",
        localizado logo acima...`,
        image: {
          alt: 'polvo',
        },
      },
    },

    Footer: {
      termsOfUseText: 'termos de uso',
      privacyPolicyText: 'política de privacidade',
      mobileContent: {
        versionText: 'versão',
        goToText: 'ir para...',
      },
      content: {
        versionText: 'produção independente — versão',
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

    TermsPage: {
      'termos-de-uso': {
        pageTitle: 'termos de uso',
      },
      'politica-de-privacidade': {
        pageTitle: 'política de privacidade',
      },
    },

    OfflinePage: {
      pageTitle: 'offline',
      imgTurtle: {
        alt:
          'uma tartaruga com três bolhas, de diferentes tamanhos, acima de sua cabeça',
      },
      h1: 'sem internet',
      h2: 'tentando reconexão...',
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
