export type Theme = 'primary' | 'warn' | 'accent';

export interface LoadingStatesSectionConfig {
  sizes: {[sizeId: string]: number};
  defaultErrorMsg: string;
  actionBtnText: string;
  theme?: Theme;
}
