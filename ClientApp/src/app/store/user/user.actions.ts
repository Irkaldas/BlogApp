import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/model/authResponse';
import { User } from 'src/app/model/user.model';
import { UserRegistration } from 'src/app/model/userRegistration.model';

export const registerUser = createAction(
  '[User] Register User',
  props<{ userRegistration: UserRegistration }>()
)

export const registerUserSuccess = createAction(
  '[User] Register User Success',
  props<{ userRegistration: UserRegistration }>()
)

export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{ userRegistration: UserRegistration }>()
)

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: User, authResponse: AuthResponse }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: any }>()
);

export const logoutUser = createAction(
  '[User] Logout User'
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ data: any }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
