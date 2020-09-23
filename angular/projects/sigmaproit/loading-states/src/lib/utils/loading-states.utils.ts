import { BehaviorSubject, EMPTY, Observable, pipe, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

type pipeFn<T> = (o: Observable<T>) => Observable<T>;

export enum loadingStates {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
  empty = 'empty',
  done = 'done',
}

export type LoadingState = keyof typeof loadingStates;

export interface LoadingStateContext<E = any> {
  error: E;
  loadingState: LoadingState;
}

interface UpdateLoadingConfig {
  errorMapper?: (err: any) => any;
  emptyChecker?: (result: any) => boolean;
  swallowError?: boolean;
  updateOnErrorOnly?: boolean;
}

export type LoadingStatesSubject = Subject<LoadingStateContext>;

export class LoadingStatesBSubject extends BehaviorSubject<LoadingStateContext> {
  constructor() {
    super({
      error: null,
      loadingState: loadingStates.initial,
    });
  }
}

export function startLoading<T>(loadingStateSubject: LoadingStatesSubject): pipeFn<T> {
  return pipe(
    tap(() => loadingStateSubject.next({
      error: null,
      loadingState: loadingStates.loading,
    }))
  );
}

export function startLoadingSync(loadingStateSubject: LoadingStatesBSubject): void {
  loadingStateSubject.next({
    error: null,
    loadingState: loadingStates.loading,
  });
}

export function updateLoading<T>(loadingStateSubject: LoadingStatesBSubject, config?: UpdateLoadingConfig): pipeFn<T> {
  const {emptyChecker, errorMapper, swallowError, updateOnErrorOnly} = config || {};
  return pipe(
    tap((result) => {
      if (updateOnErrorOnly) {
        return;
      }
      const isEmpty = emptyChecker ? emptyChecker(result) : false;
      loadingStateSubject.next({
        error: null,
        loadingState: isEmpty ? loadingStates.empty : loadingStates.done,
      });
    }),
    catchError(err => {
      const mappedError = errorMapper ? errorMapper(err) : err;
      loadingStateSubject.next({
        error: mappedError,
        loadingState: loadingStates.error,
      });
      return swallowError ? EMPTY : throwError(err);
    })
  );
}
