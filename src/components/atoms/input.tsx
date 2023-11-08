import pickBy from 'lodash/pickBy';
import React, {
  forwardRef,
  HTMLProps,
  ReactElement,
  Ref,
  useCallback,
} from 'react';

import { styled } from '../../styled';
import { getTheme, theme } from '../../utils';
import CloseCircleFillSvg from '../../icons/close-circle-fill.svg';

interface InputProps {
  inputClassName?: string;
  label?: string;
  inputSize?: Size;
  inputState?: State;
  message?: any;
  name?: string;
  isError?: boolean;
  disabled?: boolean;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  allowClear?: boolean;
  onClearValue?: () => void;
}

type State = 'default' | 'success' | 'error';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const fontSizes = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
};

const heights = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

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

const labelTopHavevalue = { sm: 2, md: 4, lg: 6, xl: 8 };
const labelTop = { sm: 4, md: 8, lg: 12, xl: 16 };

const InputContainerStyled = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const InputStyled = styled.input<{
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

  background-color: ${(props) => {
    if (props.disabled) {
      return getTheme(props.theme).colors['neutral-200'];
    }

    return backgrounds[props.$state ?? 'default'];
  }};
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

  &:not(:placeholder-shown) {
    outline: none;
    padding-top: ${(props) => {
      if (!props.$label) {
        return '0px';
      }
      return paddingTops[props.$size] + 'px';
    }};
  }

  &:not(:placeholder-shown) + label {
    font-size: 12px;
    line-height: 16px;
    top: ${(props) => `${labelTopHavevalue[props.$size]}px`};
  }

  &:focus {
    outline: none;
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
    top: ${(props) => `${labelTopHavevalue[props.$size]}px`};
  }
`;

const InputLabelStyled = styled.label<{
  $size: Size;
  $haveValue: boolean;
}>`
  color: ${(props) => getTheme(props.theme).colors['neutral']};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  position: absolute;
  pointer-events: none;

  left: ${(props) => `${paddings[props.$size]}px`};
  top: ${(props) => {
    if (props.$haveValue) {
      return `${labelTopHavevalue[props.$size]}px`;
    }

    return `${labelTop[props.$size]}px`;
  }};
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
`;

const MessageStyled = styled.span`
  display: block;
  color: ${(props) => getTheme(props.theme).colors['error']};
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

const RightIconStyled = styled.div<{ $size: Size }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: ${(props) => heights[props.$size]}px;
  width: ${(props) => heights[props.$size]}px;
`;

const LeftIconStyled = styled.div<{ $size: Size }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: ${(props) => heights[props.$size]}px;
  width: ${(props) => heights[props.$size]}px;
`;

function Input(
  {
    id,
    label,
    name,
    value,
    type,
    inputSize = 'xl',
    inputState = 'default',
    className,
    inputClassName,
    message,
    style,
    onChange,
    onKeyDown,
    onKeyUp,
    onClick,
    onBlur,
    onClearValue = () => null,
    min,
    max,
    disabled,
    placeholder,
    rightIcon = null,
    leftIcon = null,
    pattern,
    autoComplete,
    autoFocus,
    allowClear = false,
    inputMode,
    required,
  }: InputProps & HTMLProps<HTMLInputElement>,
  ref: Ref<HTMLInputElement>,
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
      onClick,
    },
    (value) => value !== undefined,
  );

  const _onClearValue = useCallback(() => {
    // @ts-expect-error
    onChange({ target: { value: '' } });
    onClearValue();
  }, []);

  return (
    <InputContainerStyled className={className}>
      <InputStyled
        ref={ref}
        {...htmlInputProps}
        $size={inputSize}
        $state={inputState}
        $rightIcon={rightIcon}
        $leftIcon={leftIcon}
        $label={label}
        placeholder={placeholder ?? ' '} // to support css selector, do not remove
      />
      {leftIcon && (
        <LeftIconStyled $size={inputSize}>{leftIcon}</LeftIconStyled>
      )}
      {label && (
        <InputLabelStyled $size={inputSize} $haveValue={!!value}>
          {label}
        </InputLabelStyled>
      )}
      {rightIcon && (
        <RightIconStyled $size={inputSize}>{rightIcon}</RightIconStyled>
      )}
      {allowClear && !!value && (
        <RightIconStyled $size={inputSize} onClick={_onClearValue}>
          <CloseCircleFillSvg width={24} height={24} />
        </RightIconStyled>
      )}
      {message && <MessageStyled>{message}</MessageStyled>}
    </InputContainerStyled>
  );
}

export default forwardRef(Input);
