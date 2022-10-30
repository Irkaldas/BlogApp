import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/model/authResponse';
import { User } from 'src/app/model/user.model';
import { UserRegistration } from 'src/app/model/userRegistration.model';

export const userActions = createActionGroup({
  source: 'User API',
  events: {
    'Register': props<{ userRegistration: UserRegistration }>(),
    'Register Success': props<{ userRegistration: UserRegistration }>(),
    'Login': props<{ user: User }>(),
    'Login Success': props<{ user: User, authResponse: AuthResponse }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
  }
})