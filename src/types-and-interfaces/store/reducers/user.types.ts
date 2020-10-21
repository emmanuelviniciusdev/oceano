import { UserCollectionType } from '../../collections/users.types';

export type UserStateType =
  | ({ uid: string; isEmailVerified: boolean } & UserCollectionType)
  | null;
