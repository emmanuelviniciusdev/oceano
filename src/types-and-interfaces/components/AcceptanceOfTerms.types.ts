import { TranslationsType } from '../hooks/useTranslation.types';
import { SignInMethodType } from './SignInMethods.types';

export type TypeOfContentType = 'terms-of-use' | 'privacy-policy';

export type AcceptanceOfTermsType = {
  authType: SignInMethodType;
  onClose?: () => void;
};

export type ContentComponentType = {
  translation: TranslationsType;
  type: TypeOfContentType;
};
