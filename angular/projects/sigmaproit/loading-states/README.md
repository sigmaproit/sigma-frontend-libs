# LoadingStates

Use RxJS to handle Angular Loading States with ease

![version](https://img.shields.io/npm/v/@sigmaproit/loading-states?style=flat-square)
![@angular/core](https://img.shields.io/npm/dependency-version/@sigmaproit/loading-states/peer/@angular/core?style=flat-square)
![license](https://img.shields.io/npm/l/@sigmaproit/loading-states?style=flat-square)


```typescript
import { LoadingStatesBSubject, startLoading, updateLoading } from '@sigmaproit/loading-states';


export class HelloComponent {
  
    dataLoadingStates$ = new LoadingStatesBSub(); // initial value => {loadingState: 'initial', error: null}
    
    getFavouriteCharacters() {
        startLoadingSync(this.dataLoadingStates$); // emits value => {loadingState: 'loading', error: null}
        return this.apiService.getFavouriteCharacters().pipe(
            // emits value => {loadingState: 'done', error: null} in case of succeded request and value
            // emits value => {loadingState: 'empty', error: null} in case of succeded request and emptyChecker is true
            // emits value => {loadingState: 'error', error: returnedError} in case of error and will swallow the error
            updateLoading(this.dataLoadingStates$, {
                swallowError: true,
                emptyChecker: (response) => !response.characters.length
            }),
        );
    }
}
```


## Table Of Contents
- [Usage](#usage)
- [Helper Pipes](#helper-pipes)

### Usage

install using npm

```
npm i --save @sigmaproit/loading-states
```

add to your component when you need to track the loading states for some request

```typescript
import { LoadingStatesBSubject, startLoading, updateLoading } from '@sigmaproit/loading-states';


export class HelloComponent {
  
    dataLoadingStates$ = new LoadingStatesBSub(); // initial value => {loadingState: 'initial', error: null}
    
    getFavouriteCharacters() {
        startLoadingSync(this.dataLoadingStates$); // emits value => {loadingState: 'loading', error: null}
        return this.apiService.getFavouriteCharacters().pipe(
            // emits value => {loadingState: 'done', error: null} in case of succeded request and value
            // emits value => {loadingState: 'empty', error: null} in case of succeded request and emptyChecker is true
            // emits value => {loadingState: 'error', error: returnedError} in case of error and will swallow the error
            updateLoading(this.dataLoadingStates$, 
                // the following is optional options
                {
                    swallowError: true,
                    emptyChecker: (response) => !response.characters.length
                }
            ),
            take(1),
        ).subscribe(charactersData => this.charactersData = charactersData);
    }
}
```

then you can use it in your template
```angular2html
<ng-container *ngIf="dataLoadingStates$ | async as states">

    <div *ngIf="states.loadingState === 'loading'">loading...</div>

    <div *ngIf="states.loadingState === 'error'">
        <div>something went wrong</div>
        <div>Reason : {{states.error.message}}</div>
        <button (click)="getFavouriteCharacters()">Reload</button>
    </div>

    <div *ngIf="states.loadingState === 'empty'">
        There is no Favourite Characters to show! 🤷
    </div>

    <ng-container *ngIf="states.loadingState === 'done'">
        <div *ngFor="let character of charactersData.characters">
            {{character.name}}
        </div>
    </ng-container>

</ng-container>
```

### Helper Pipes

instead of using check the state using its string ID like `*ngIf="states.loadingState === 'loading'"`,
you can use helper pipes for each state like `isLoading`, `isError`, `isEmpty` and so on.

So instead of `*ngIf="states.loadingState === 'loading'"` you can use `*ngIf="states.loadingState | isLoading"`.

To use these pipes, you will have to import `LoadingStatesModule` in your `AppModule` or `SharedModule` if you have one.

```typescript
import { LoadingStatesModule } from '@sigmaproit/loading-states';

@NgModule({
  imports: [
    BrowserModule,
    // here is the LoadingStatesModule
    LoadingStatesModule,
  ],
})
export class AppModule { }
```
