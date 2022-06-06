import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { loginUser, loginUserFailure, loginUserSuccess } from './user.actions';



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap((actionParameter) =>
        this.authService.Login(actionParameter.email, actionParameter.password)
          .pipe(
            map((user) => {
              console.log(user);
              return loginUserSuccess({ user: user });
            }
            ),
            catchError((error) => of(loginUserFailure({ error: error })))
          )
      ))
  }
  )
}
