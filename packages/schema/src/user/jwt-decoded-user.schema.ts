import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

export type JwtDecodedUser = DecodedIdToken & {
  userRecord: UserRecord;
};
