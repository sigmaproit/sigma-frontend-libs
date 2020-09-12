import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs';
import { delay, map, switchMap, tap, scan, catchError } from 'rxjs/operators';
import {
  detectLoadingErrorState,
  detectLoadingState,
  LoadingStatesBSubject,
  startLoading, startLoadingSync, updateLoading,
} from '@sigmaproit/loading-states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'examples-loading-states';

  loadData$ = new BehaviorSubject(null);
  simpleLoadingStatesContext$ = new LoadingStatesBSubject();

  debugLoadingContext$ = this.simpleLoadingStatesContext$.pipe(tap(console.log)).subscribe();

  loadingCounter$ = this.loadData$.pipe(
    delay(0),
    startLoading(this.simpleLoadingStatesContext$),
    delay(3000),
    scan((acc, v) => acc + 1, 0),
    detectLoadingState(this.simpleLoadingStatesContext$),
  );


  loadData2$ = new BehaviorSubject(null);
  loadingWithErrorStatesContext$ = new LoadingStatesBSubject();
  error = false;
  isEmpty = false;
  message$ = this.loadData2$.pipe(
    delay(0),
    startLoading(this.loadingWithErrorStatesContext$),
    delay(2000),
    scan((acc, v) => acc + 1, 0),
    switchMap(
      (count) => {
        const mappedObs = this.error ? throwError('Something wrong!') : of(count);
        return mappedObs.pipe(
          updateLoading(this.loadingWithErrorStatesContext$, {
            swallowError: true,
            errorMapper: (err) => `Ooooops! ${err}`,
          }),
        );
      },
    ),
    map(count => `This is the #${count} time to load data`),
    updateLoading(this.loadingWithErrorStatesContext$, {
      emptyChecker: () => this.isEmpty,
    }),
  );

  ngOnInit(): void {
    startLoadingSync(this.simpleLoadingStatesContext$);
  }
}
