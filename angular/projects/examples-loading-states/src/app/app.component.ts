import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { delay, map, scan, switchMap } from 'rxjs/operators';
import { LoadingStatesBSubject, startLoading, updateLoading } from '@sigmaproit/loading-states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'examples-loading-states';

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
            updateOnErrorOnly: true,
            errorMapper: (err) => `Ooooops! ${err}`,
          }),
        );
      },
    ),
    switchMap(
      (count) => of(count * 100).pipe(
        delay(500),
      ),
    ),
    map(count => `This is the #${count} time to load data`),
    updateLoading(this.loadingWithErrorStatesContext$, {
      emptyChecker: () => this.isEmpty,
    }),
  );

  ngOnInit(): void {
  }
}
