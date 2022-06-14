import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { loginUser, loginUserFailure, loginUserSuccess, logoutUser } from './user.actions';



// @Injectable()
// export class UserEffects {
//   constructor(
//     private actions$: Actions,
//     private authService: AuthService
//   ) { }

//   loginUser$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(loginUser),
//       switchMap((actionParameter) =>
//         this.authService.Login(actionParameter.user)
//           .pipe(
//             tap((res: any) => {
//               localStorage.setItem("accessToken", res.accessToken);
//               this.authService.isLoggedIn$.next(true);
//             }),
//             map((user) =>
//               loginUserSuccess({ user: user })
//             ),
//             catchError((error) => of(loginUserFailure({ error: error })))
//           )
//       ))
//   })

//   logOutUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(logoutUser),
//       tap(() => {
//         localStorage.removeItem("accessToken");
//         this.authService.isLoggedIn$.next(false);
//       }),
//     ), { dispatch: false });
// }
