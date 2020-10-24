import { UserCollectionType } from '../../collections/users.types';

export type UserStateType =
  | ({
      uid: string;
      providerId: string | undefined;
      isEmailVerified: boolean;
      areTermsAccepted: boolean;
    } & UserCollectionType)
  | null;
