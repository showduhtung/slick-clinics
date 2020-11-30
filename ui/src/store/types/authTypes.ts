/** Action Types */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/** Action Creators */
interface LoginAction {
  type: typeof LOGIN;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

/** Reducer State */
export interface AuthState {
  isTokenAvailable: boolean;
}
