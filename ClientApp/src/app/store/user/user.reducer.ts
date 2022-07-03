import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { loginUser, loginUserSuccess, logoutUser } from './user.actions';


export const userFeatureKey = 'user';

export interface UserState {
  user?: User,
  isLoggedIn?: boolean,
  error?: string
}

export const initialState: UserState = {
  user: new User(),
  isLoggedIn: false,
  error: ''
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
  })),
  on(loginUserSuccess, (state, { user, authResponse }) => ({
    ...state,
    user: user,
    isLoggedIn: authResponse.isAuthSuccessful
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: new User(),
    status: 'offline',
    error: ''
  }))
);
