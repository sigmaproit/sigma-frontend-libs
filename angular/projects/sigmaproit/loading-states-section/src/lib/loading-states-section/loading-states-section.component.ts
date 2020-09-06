import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { LoadingStatesSectionConfig, Theme } from '../loading-states-section.models';

@Component({
  selector: 'sigma-loading-states-section',
  template: `
    <div class="sigma-loading-states-section">
      <div *ngIf="state === 'loading'" class="sigma-loading-states-section__loading">
        <mat-spinner [diameter]="spinnerRadius" [color]="themeVal"></mat-spinner>
      </div>
      <div *ngIf="state === 'error'" class="sigma-loading-states-section__error">
        <div class="sigma-loading-states-section__error-message">{{errorMsg}}</div>
        <div class="sigma-loading-states-section__error-actions">
          <button mat-raised-button (click)="actionClicked.emit()" [color]="themeVal">{{actionBtnTxt}}</button>
        </div>
      </div>
      <div *ngIf="state === 'done'" class="sigma-loading-states-section__done">
        <ng-content></ng-content>
      </div>
      <div *ngIf="state === 'empty'" class="sigma-loading-states-section__empty">
        <ng-content select="[empty]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./loading-states-section.component.scss'],
})
export class LoadingStatesSectionComponent {

  @Input() state: 'initial' | 'loading' | 'error' | 'empty' | 'done';

  spinnerRadius = 15;
  @Input()
  set size(sizeId: string) {
    this.spinnerRadius = this.config.sizes && this.config.sizes[sizeId] || this.spinnerRadius;
  }

  errorMsg = this.config.defaultErrorMsg;
  @Input()
  set errorMessage(msg: string) {
    this.errorMsg = msg || this.config.defaultErrorMsg;
  }

  actionBtnTxt: string = this.config.actionBtnText;
  @Input()
  set actionBtnText(text: string) {
    this.actionBtnTxt = text || this.config.actionBtnText;
  }

  themeVal = this.config.theme;
  @Input()
  set theme(theme: Theme) {
    this.themeVal = theme || this.config.theme;
  }

  @Output() actionClicked = new EventEmitter();

  constructor(@Inject('config') private config: LoadingStatesSectionConfig) {
  }

}
