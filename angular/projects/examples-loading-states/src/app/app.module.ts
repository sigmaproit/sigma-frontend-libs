import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoadingStatesModule } from '@sigmaproit/loading-states';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingStatesSectionModule } from '@sigmaproit/loading-states-section';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadingStatesModule,
    LoadingStatesSectionModule.forRoot({
      sizes: {
        large: 35,
      },
      actionBtnText: 'Reload',
      defaultErrorMsg: 'Ooops! Something went wrong! Please try again by using the Reload button below',
    }),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
