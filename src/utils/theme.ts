import isEmpty from 'lodash/isEmpty';
import { css } from 'styled-components';
import { Interpolation, RuleSet, Styles } from 'styled-components/dist/types';

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | 'hg';

export const breakpoints: { [key in BreakPoint]: string } = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1366px',
  hg: '1920px',
};

// Color palettes
export const theme = {
  colors: {
    neutral: '#9E9E9E',
    'neutral-50': '#fafafa',
    'neutral-100': '#F5f5f5',
    'neutral-200': '#eeeeee',
    'neutral-300': '#e0e0e0',
    'neutral-400': '#bdbdbd',
    'neutral-500': '#9E9E9E',
    'neutral-600': '#757575',
    'neutral-700': '#616161',
    'neutral-800': '#424242',
    'neutral-900': '#212121',

    primary: '#219b67',
    'primary-50': '#E9F5F0',
    'primary-100': '#BAE0D0',
    'primary-200': '#99D1B9',
    'primary-300': '#6ABC99',
    'primary-400': '#4DAF85',
    'primary-500': '#219B67',
    'primary-600': '#1E8D5E',
    'primary-700': '#176E49',
    'primary-800': '#125539',
    'primary-900': '#0E412B',

    secondary: '#2F9CEE',
    'secondary-50': '#ECF6FD',
    'secondary-100': '#C7E4FA',
    'secondary-200': '#A1D2F7',
    'secondary-300': '#7BC0F4',
    'secondary-400': '#55AEF1',
    'secondary-500': '#2F9CEE',
    'secondary-600': '#1288E2',
    'secondary-700': '#0F72BD',
    'secondary-800': '#0C5B97',
    'secondary-900': '#07375C',

    tertiary: '#FF9D0A',
    'tertiary-50': '#FFF9E6',
    'tertiary-100': '#FFE9AD',
    'tertiary-200': '#FFDA85',
    'tertiary-300': '#FFC95C',
    'tertiary-400': '#FFB433',
    'tertiary-500': '#FF9D0A',
    'tertiary-600': '#D97B00',
    'tertiary-700': '#B35F00',
    'tertiary-800': '#8C4600',
    'tertiary-900': '#663000',

    warning: '#EAB308',
    'warning-50': '#FDF7E6',
    'warning-100': '#FAC5C5',
    'warning-200': '#F5DC8D',
    'warning-300': '#F1CC5A',
    'warning-400': '#EEC239',
    'warning-500': '#EAB308',
    'warning-600': '#D5A307',
    'warning-700': '#A67F06',
    'warning-800': '#816204',
    'warning-900': '#624B03',

    error: '#EF4444',
    'error-50': '#FDECEC',
    'error-100': '#FAC5C5',
    'error-200': '#F8A9A9',
    'error-300': '#F48282',
    'error-400': '#F26969',
    'error-500': '#EF4444',
    'error-600': '#D93E3E',
    'error-700': '#AA3030',
    'error-800': '#832525',
    'error-900': '#641D1D',
  },
  breakpoints: breakpoints,
};

export function breakpointCssFactory(breakpoint: BreakPoint, css: string) {
  return `@media (min-width: ${breakpoints[breakpoint]}) {
    ${css}
  }`;
}

// Breakpoints based on your configuration
interface RespondTo {
  sm: typeof css;
  md: typeof css;
  lg: typeof css;
  xl: typeof css;
}
export const respondTo: RespondTo = Object.keys(breakpoints).reduce(
  (accumulators, label) => {
    const breakpoint = breakpoints[label as BreakPoint];

    const accumulator = (
      first: Styles<any>,
      ...interpolations: Interpolation<any>[]
    ): RuleSet<any> => css`
      @media (min-width: ${breakpoint}) {
        ${css(first, ...interpolations)};
      }
    `;
    return { ...accumulators, [label]: accumulator };
  },
  {},
) as RespondTo;

export function getTheme(contextTheme: any) {
  if (!isEmpty(contextTheme)) {
    return contextTheme;
  }

  return theme;
}

export default theme;
