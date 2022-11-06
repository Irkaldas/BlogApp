import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;
export const selectUserData = createSelector(
    selectUser,
    (state: UserState) => state.user
)
export const selectIsUserLoggedIn = createSelector(
    selectUser,
    (state: UserState) => state.user?.isLoggedIn
)

export const selectUserId = createSelector(
    selectUser,
    (state: UserState) => state.user?.id
)

export const selectUserName = createSelector(
    selectUser,
    (state: UserState) => state.user?.fullName
)

