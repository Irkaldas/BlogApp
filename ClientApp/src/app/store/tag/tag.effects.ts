import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TagsService } from 'src/app/services/tags.service';
import { tagsActions } from './tag.actions';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';



@Injectable()
export class TagEffects {
  constructor(
    private actions$: Actions,
    private tagsService: TagsService
  ) { }

  loadTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tagsActions.load),
      switchMap(() =>
        this.tagsService.GetTags()
          .pipe(
            map((tags) =>
              tagsActions.loadSuccess({ tags: tags })
            )
          )
      )
    );
  });
}
