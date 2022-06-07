import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { loginUser, loginUserSuccess } from './user.actions';


export const userFeatureKey = 'user';

export interface UserState {
  user: User,
  token: string,
  status: 'online' | 'offline' | 'login' | 'logout' | 'error'
  error: string
}

export const initialState: UserState = {
  user: new User(),
  token: '',
  status: 'offline',
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
  })),
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  }))
);
