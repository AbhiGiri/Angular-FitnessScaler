import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export class SetAuthenticating implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticating implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticating | SetUnauthenticating;
