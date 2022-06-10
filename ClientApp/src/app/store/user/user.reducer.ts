import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { loginUser, loginUserSuccess, logoutUser } from './user.actions';


export const userFeatureKey = 'user';

export interface UserState {
  user: User,
  status: 'online' | 'offline' | 'error'
  error: string
}

export const initialState: UserState = {
  user: new User(),
  status: 'offline',
  error: ''
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
  })),
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    status: 'online'
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: new User(),
    status: 'offline',
    error: ''
  }))
);
