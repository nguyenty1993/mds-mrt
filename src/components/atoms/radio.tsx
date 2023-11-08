import React, { InputHTMLAttributes, ReactNode } from 'react';

import Typography from './typography';
import { styled } from '../../styled';
import { getTheme } from '../../utils/theme';

type RadioState = 'default' | 'success' | 'error';

const LabelStyled = styled(Typography)`
  flex-grow: 1;
  margin-left: 8px;
`;

const InputStyled = styled.input<{
  disabled?: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CheckedStyled = styled.span<{ $disabled: boolean; $state: RadioState }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$disabled) {
      return getTheme(props.theme).colors['neutral-900'];
    }

    return {
      error: getTheme(props.theme).colors['error'],
      default: getTheme(props.theme).colors['primary'],
      success: getTheme(props.theme).colors['primary'],
    }[props.$state];
  }};
`;

const VisibleStyled = styled.span<{
  $disabled: boolean;
  $checked: boolean;
  $state: RadioState;
}>`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  padding: 1px;

  border: ${(props) => {
    if (props.$disabled) {
      return `1px solid ${getTheme(props.theme).colors['neutral-500']}`;
    }

    if (!props.$checked) {
      return `1px solid ${getTheme(props.theme).colors['neutral-300']}`;
    }

    return `1px solid ${
      {
        error: getTheme(props.theme).colors['error'],
        success: getTheme(props.theme).colors['primary'],
        default: getTheme(props.theme).colors['primary'], // because checked
      }[props.$state]
    }`;
  }};

  ${CheckedStyled} {
    display: ${(props) => (props.$checked ? 'block' : 'none')};
  }
`;

const RadioStyled = styled.span`
  width: 16px;
  height: 16px;
  margin-top: 4px;
  position: relative;
`;

const RadioWrapperStyled = styled.label<{
  $disabled: boolean;
  $state: RadioState;
  $checked: boolean;
}>`
  display: flex;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  &:hover ${VisibleStyled} {
    border: ${(props) => {
      if (props.$disabled) {
        return `1px solid ${getTheme(props.theme).colors['neutral-500']}`;
      }

      return `1px solid ${
        {
          error: getTheme(props.theme).colors['error'],
          success: getTheme(props.theme).colors['primary'],
          default: getTheme(props.theme).colors['primary'],
        }[props.$state]
      }`;
    }};
  }
`;

const Radio = ({
  className,
  label,
  disabled = false,
  checked = false,
  onChange,
  state = 'default',
  ...inputProps
}: {
  disabled?: boolean;
  label?: ReactNode;
  color?: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  state?: RadioState;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  return (
    <RadioWrapperStyled
      className={className}
      $checked={checked}
      $state={state}
      $disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <RadioStyled>
        <InputStyled
          {...inputProps}
          type='radio'
          checked={checked}
          disabled={disabled}
          onChange={() => {
            onChange(!checked);
          }}
        />
        <VisibleStyled $checked={checked} $disabled={disabled} $state={state}>
          <CheckedStyled $disabled={disabled} $state={state} />
        </VisibleStyled>
      </RadioStyled>

      <LabelStyled type={'p-2'} as='div'>
        {label}
      </LabelStyled>
    </RadioWrapperStyled>
  );
};

export default Radio;
