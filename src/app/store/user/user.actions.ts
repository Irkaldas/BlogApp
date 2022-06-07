import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: User }>()
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
