import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { LoadingStatesSectionConfig } from './loading-states-section.models';

@Component({
  selector: 'sigma-loading-states-section',
  template: `
    <div class="sigma-loading-states-section">
      <div *ngIf="state === 'loading'" class="sigma-loading-states-section__loading">
        <mat-spinner [diameter]="spinnerRadius"></mat-spinner>
      </div>
      <div *ngIf="state === 'error'" class="sigma-loading-states-section__error">
        <div>{{errorMsg}}</div>
        <button mat-raised-button (click)="actionClicked.emit()">{{actionBtnTxt}}</button>
      </div>
      <div *ngIf="state === 'done'" class="sigma-loading-states-section__done">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class LoadingStatesSectionComponent {

  @Input() state: 'initial' | 'loading' | 'error' | 'empty' | 'done';

  spinnerRadius = 15;

  @Input()
  set size(sizeId: string) {
    this.spinnerRadius = this.config.sizes && this.config.sizes[sizeId] || this.spinnerRadius;
  }

  errorMsg: string;

  @Input()
  set errorMessage(msg: string) {
    this.errorMsg = msg || this.config.defaultErrorMsg;
  }

  actionBtnTxt: string;

  @Input()
  set actionBtnText(text: string) {
    this.actionBtnTxt = text || this.config.actionBtnText;
  }

  @Output() actionClicked = new EventEmitter();

  constructor(@Inject('config') private config: LoadingStatesSectionConfig) {
  }

}
