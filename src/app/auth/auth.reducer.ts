import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, AuthActions } from './auth.actions';

export interface State {
  isAuthenticated: boolean
};

const inititalState: State = {
  isAuthenticated: false
};

export function uiReducer(state = inititalState, action: AuthActions)  {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
