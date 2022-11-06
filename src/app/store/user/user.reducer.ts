import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { userActions } from './user.actions';


export const userFeatureKey = 'user';

export interface UserState {
  user?: User
}

export const userInitialState: UserState = {
  user: {
    email: "test@test.pl",
    fullName: "Kamil Test",
    id: "42069",
    isLoggedIn: true
  }
};

export const userReducer = createReducer(
  userInitialState,
  on(userActions.loginSuccess, (state, { user, authResponse }) => ({
    ...state,
    user: {
      ...user,
      isLoggedIn: authResponse.isAuthSuccessful
    }
  })),
  on(userActions.logoutSuccess, (state) => ({
    ...state,
    user: undefined
  })
  )
)
