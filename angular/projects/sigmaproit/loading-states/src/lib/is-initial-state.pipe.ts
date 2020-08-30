import { Pipe, PipeTransform } from '@angular/core';
import { LoadingStateContext, loadingStates } from './utils/loading-states.utils';

@Pipe({
  name: 'isInitialState'
})
export class IsInitialStatePipe implements PipeTransform {

  transform(loadingStateCtx: LoadingStateContext): boolean {
    return loadingStateCtx.loadingState === loadingStates.initial;
  }

}
