import { ThemePalette } from '@angular/material/core/common-behaviors/color';

export interface LoadingStatesSectionConfig {
  sizes: {[sizeId: string]: number};
  defaultErrorMsg: string;
  actionBtnText: string;
  theme?: ThemePalette;
}
