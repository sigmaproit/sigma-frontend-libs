import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LoadingStatesSectionComponent } from './loading-states-section/loading-states-section.component';
import { LoadingStatesSectionConfig } from './loading-states-section.models';



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
          useValue: {
            ...config,
            theme: 'primary',
          } as LoadingStatesSectionConfig,
        },
      ],
    };
  }
}
