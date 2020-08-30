import { Pipe, PipeTransform } from '@angular/core';
import { LoadingStateContext, loadingStates } from './utils/loading-states.utils';

@Pipe({
  name: 'isErrorState'
})
export class IsErrorStatePipe implements PipeTransform {

  transform(loadingStateCtx: LoadingStateContext): boolean {
    return loadingStateCtx.loadingState === loadingStates.error;
  }

}
