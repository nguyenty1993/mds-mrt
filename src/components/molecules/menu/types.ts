export interface MenuItem {
  link?: string | null;
  name: string;
  target?: string;
  forceLink?: boolean;
  disabled?: boolean;
  subMenu?: MenuItem[];
  forceReload?: boolean;
  badge?: boolean;
}

export type BreakPointToNumber = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  hg?: number;
};

export type BreakPointToString = {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  hg?: string;
};

export interface BreakPointTo<T> {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  hg?: T;
}
