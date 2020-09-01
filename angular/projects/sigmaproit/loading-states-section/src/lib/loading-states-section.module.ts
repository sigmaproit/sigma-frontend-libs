import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoadingStatesSectionComponent } from './loading-states-section.component';
import { LoadingStatesSectionConfig } from './loading-states-section.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoadingStatesSectionComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [LoadingStatesSectionComponent]
})
export class LoadingStatesSectionModule {
  static forRoot(config: LoadingStatesSectionConfig): ModuleWithProviders<LoadingStatesSectionModule> {
    return {
      ngModule: LoadingStatesSectionModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
      ],
    };
  }
}
