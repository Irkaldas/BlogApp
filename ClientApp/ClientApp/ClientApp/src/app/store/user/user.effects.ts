import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../app.state';
import { favoritesActions } from '../favorite/favorite.actions';
import { userActions } from './user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userActions.login),
            exhaustMap((actionParameter) =>
                this.authService.Login(actionParameter.user)
                    .pipe(
                        map((res: any) =>
                            userActions.loginSuccess({ user: res.user, authResponse: res.authResponse }),
                        )
                    )
            )
        )
    });

    logOutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.logout),
            tap(() => {
                userActions.logoutSuccess();
            }),
        ), { dispatch: false });
}
