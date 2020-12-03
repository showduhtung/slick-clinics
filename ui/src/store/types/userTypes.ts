import { UserData, HttpError, LoadingPayload } from '../../shared/types';

/** Action Types */
export const GET_USER = 'GET_USER';
export const USER_LOADING = 'USER_LOADING';

/** Action Creators */
interface GetUserAction {
  type: typeof GET_USER;
  payload: UserData[];
}

interface UserLoadingAction {
  type: typeof USER_LOADING;
  payload: LoadingPayload;
}

export type UserActionTypes = GetUserAction | UserLoadingAction;

/** Reducer State */
export interface UserState {
  data: UserData[];
  loading: boolean;
  status: HttpError;
}
