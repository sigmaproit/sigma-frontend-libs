import { Pipe, PipeTransform } from '@angular/core';
import { LoadingStateContext, loadingStates } from './utils/loading-states.utils';

@Pipe({
  name: 'isLoadingState'
})
export class IsLoadingStatePipe implements PipeTransform {

  transform(loadingStateCtx: LoadingStateContext): boolean {
    return loadingStateCtx.loadingState === loadingStates.loading;
  }

}
