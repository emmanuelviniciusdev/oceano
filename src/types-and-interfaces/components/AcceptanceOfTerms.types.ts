import { TranslationsType } from '../hooks/useTranslation.types';

export type TypeOfContentType = 'terms-of-use' | 'privacy-policy';

export type AcceptanceOfTermsType = {
  authType: 'google' | 'microsoft';
  onClose?: () => void;
};

export type ContentComponentType = {
  translation: TranslationsType;
  type: TypeOfContentType;
};
