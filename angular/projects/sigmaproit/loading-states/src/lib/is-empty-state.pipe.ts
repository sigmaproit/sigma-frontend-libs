import { Pipe, PipeTransform } from '@angular/core';
import { LoadingStateContext, loadingStates } from './utils/loading-states.utils';

@Pipe({
  name: 'isEmptyState'
})
export class IsEmptyStatePipe implements PipeTransform {

  transform(loadingStateCtx: LoadingStateContext): boolean {
    return loadingStateCtx.loadingState === loadingStates.empty;
  }

}
