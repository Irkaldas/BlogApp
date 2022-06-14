import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
//import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.userReducer),
    // EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
