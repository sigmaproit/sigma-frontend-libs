import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoadingStatesModule } from '@sigmaproit/loading-states';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadingStatesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
