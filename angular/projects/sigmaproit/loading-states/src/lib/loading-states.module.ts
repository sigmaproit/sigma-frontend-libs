import { NgModule } from '@angular/core';
import { IsLoadingStatePipe } from './is-loading-state.pipe';
import { IsErrorStatePipe } from './is-error-state.pipe';
import { IsEmptyStatePipe } from './is-empty-state.pipe';
import { IsInitialStatePipe } from './is-initial-state.pipe';

const statesPipes = [IsLoadingStatePipe, IsErrorStatePipe, IsEmptyStatePipe, IsInitialStatePipe];

@NgModule({
  declarations: [
    ...statesPipes,
  ],
  imports: [],
  exports: [
    ...statesPipes,
  ],
})
export class LoadingStatesModule { }
