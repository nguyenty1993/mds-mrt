import React, {
  HTMLProps,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';

import pickBy from 'lodash/pickBy';

import { styled } from '../../styled';
import { theme } from '../../utils';

interface SelectOption {
  value: string | number;
  label: string;
}

type State = 'default' | 'success' | 'error';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const fontSizes = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 18,
};

const heights = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

interface SelectProps {
  options: SelectOption[];
  inputClassName?: string;
  label?: string;
  size?: Size;
  state?: State;
  message?: ReactNode;
  name?: string;
  isError?: boolean;
  disabled?: boolean;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  allowClear?: boolean;
  onClearValue?: () => void;
}

const borders = {
  default: `1px solid ${theme.colors['neutral-400']}`,
  success: `1px solid ${theme.colors['primary']}`,
  error: `1px solid ${theme.colors['error']}`,
};
const backgrounds = {
  default: '#ffffff',
  success: theme.colors['primary-50'],
  error: theme.colors['error-50'],
};
const paddings = { sm: 4, md: 8, lg: 12, xl: 16 };

const paddingTops = { sm: 6, md: 8, lg: 10, xl: 12 };

const labelTopSelected = { sm: 2, md: 4, lg: 6, xl: 8 };
const labelTop = { sm: 6, md: 10, lg: 14, xl: 18 };

const SelectContainerStyled = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const SelectStyled = styled.select<{
  $size: Size;
  $state: State;
  $rightIcon: ReactElement;
  $leftIcon: ReactElement;
  $label: string;
}>`
  width: 100%;
  padding: ${(props) => `
    ${props.$label ? paddingTops[props.$size] : 0}px 
    ${!!props.$rightIcon ? heights[props.$size] : paddings[props.$size]}px 
    0px 
    ${!!props.$leftIcon ? heights[props.$size] : paddings[props.$size]}px`};
  height: ${(props) => heights[props.$size] + 'px'};

  background-color: ${(props) => backgrounds[props.$state ?? 'default']};
  border-radius: 8px;
  border: ${(props) => borders[props.$state ?? 'default']};

  color: ${() => theme.colors['neutral-900']};
  font-size: ${(props) => `${fontSizes[props.$size]}px`};
  line-height: 125%;

  display: block;
  box-sizing: border-box;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  -webkit-appearance: none;

  outline: none;

  &:focus {
    border: ${(props) => {
      if (props.$state === 'error') {
        return borders['error'];
      }

      return `1px solid ${theme.colors['primary']}`;
    }};
    padding-top: ${(props) => {
      if (!props.$label) {
        return '0px';
      }
      return paddingTops[props.$size] + 'px';
    }};
  }

  &:focus + label {
    font-size: 12px;
    line-height: 16px;
    top: ${(props) => `${labelTopSelected[props.$size]}px`};
  }
`;

const SelectLabelStyled = styled.label<{
  $size: Size;
  $haveValue: boolean;
}>`
  color: ${() => theme.colors['neutral']};
  font-size: ${(props) => {
    if (props.$haveValue) {
      return '12px';
    }

    return '16px';
  }};
  line-height: 125%;
  font-weight: 500;
  position: absolute;
  pointer-events: none;

  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;

  left: ${(props) => `${paddings[props.$size]}px`};
  top: ${(props) => {
    if (props.$haveValue) {
      return `${labelTopSelected[props.$size]}px`;
    }

    return `${labelTop[props.$size]}px`;
  }};
`;

const MessageStyled = styled.span`
  display: block;
  color: ${() => theme.colors['error']};
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

function Select(
  {
    id,
    name,
    type,
    className: inputClassName,
    style,
    value,
    min,
    max,
    disabled,
    pattern,
    autoComplete,
    autoFocus,
    inputMode,
    onChange,
    onKeyDown,
    onKeyUp,
    onBlur,
    options,
    size = 'xl',
    state = 'default',
    label,
    placeholder,
    rightIcon = null,
    leftIcon = null,
    message,
  }: SelectProps & Omit<HTMLProps<HTMLSelectElement>, 'size'>,
  ref: Ref<HTMLSelectElement>,
) {
  const htmlInputProps = pickBy(
    {
      id,
      name,
      type,
      className: inputClassName,
      style,
      value,
      min,
      max,
      disabled,
      pattern,
      autoComplete,
      autoFocus,
      inputMode,
      onChange,
      onKeyDown,
      onKeyUp,
      onBlur,
    },
    (v: string) => v !== undefined,
  );

  return (
    <SelectContainerStyled>
      <SelectStyled
        ref={ref}
        {...htmlInputProps}
        $size={size}
        $state={state}
        $rightIcon={rightIcon}
        $leftIcon={leftIcon}
        $label={label}
        // to support css selector, do not remove
        placeholder={placeholder ?? ' '}
      >
        <option style={{ display: 'none' }}></option>
        {options.map((option: SelectOption) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </SelectStyled>

      {label && (
        <SelectLabelStyled $size={size} $haveValue={!!value}>
          {label}
        </SelectLabelStyled>
      )}
      {message && <MessageStyled>{message}</MessageStyled>}
    </SelectContainerStyled>
  );
}

export default forwardRef(Select);
