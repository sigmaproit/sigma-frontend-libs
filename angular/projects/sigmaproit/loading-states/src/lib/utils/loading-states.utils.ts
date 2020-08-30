import { BehaviorSubject, Observable, pipe, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

export class LoadingStatesBSubject extends BehaviorSubject<LoadingStateContext> {
  constructor() {
    super({
      error: null,
      loadingState: loadingStates.initial,
    });
  }
}

export type LoadingStatesSubject = Subject<LoadingStateContext>;

type pipeFn<T> = (o: Observable<T>) => Observable<T>;

export function startLoading<T>(loadingStateSubject: LoadingStatesSubject): pipeFn<T> {
  return pipe(
    tap(() => loadingStateSubject.next({
      error: null,
      loadingState: loadingStates.loading,
    }))
  );
}

export type ErrorMapper = (err: any) => any;
function onError(loadingStateSubject: LoadingStatesSubject, errorMapper?: ErrorMapper): (err: any) => void {
  return (err => {
    const mappedErr = errorMapper ? errorMapper(err) : err;
    loadingStateSubject.next({
      loadingState: loadingStates.error,
      error: mappedErr,
    });
  });
}

export type EmptyChecker = (result: any) => boolean;
function onSuccess(loadingStateSubject: LoadingStatesSubject, emptyChecker?: EmptyChecker): (result: any) => void {
  return (result => {
    const isEmpty = emptyChecker ? emptyChecker(result) : false;
    loadingStateSubject.next({
      error: null,
      loadingState: isEmpty ? loadingStates.empty : loadingStates.done,
    });
  });
}

export function detectLoadingErrorState<T>(loadingStateSubject: LoadingStatesSubject, errorMapper?: ErrorMapper): pipeFn<T> {
  return pipe(
    catchError(err => {
      onError(loadingStateSubject, errorMapper)(err);
      return throwError(err);
    }),
  );
}

export function detectLoadingState<T>(
  loadingStateSubject: LoadingStatesSubject,
  errorMapper?: ErrorMapper,
  emptyChecker?: EmptyChecker):
  pipeFn<T> {
  return pipe(
    tap(
      onSuccess(loadingStateSubject, emptyChecker),
      onError(loadingStateSubject, errorMapper),
    ),
  );
}
