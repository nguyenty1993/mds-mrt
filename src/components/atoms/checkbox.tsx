import React, { HTMLProps, ReactNode, Ref, forwardRef } from 'react';

import { styled } from '../../styled';
import { getTheme } from '../../utils';
import Typography from './typography';

type CheckboxState = 'default' | 'success' | 'error';

interface CheckboxProps {
  label?: ReactNode;
  width?: number | string;
  height?: number | string;
  state?: CheckboxState;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const HiddenStyled = styled.input<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CheckedStyled = styled.span<{
  $disabled: boolean;
  $state: CheckboxState;
}>`
  width: 100%;
  height: 100%;
  border-radius: 3px;

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
  $state: CheckboxState;
  $checked: boolean;
  $disabled: boolean;
}>`
  display: block;
  padding: 1px;

  width: 100%;
  height: 100%;
  background-color: ${(props) => {
    if (props.$checked) {
      return '#fff';
    }

    if (props.$disabled) {
      return getTheme(props.theme).colors['neutral-300'];
    }

    return '#fff';
  }};
  border-radius: 4px;
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

const LabelStyled = styled(Typography)`
  flex-grow: 1;
  margin-left: 8px;
`;

const CheckboxStyled = styled.span<{
  $width: string | number;
  $height: string | number;
  $disabled: boolean;
  $state: CheckboxState;
  $checked: boolean;
}>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  margin-top: 2px;
  position: relative;
`;

const CheckboxWrapperStyled = styled.label<{
  $disabled: boolean;
  $state: CheckboxState;
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

const Checkbox = (
  {
    className,
    label,
    checked = false,
    width = 16,
    height = 16,
    onChange,
    state = 'default',
    disabled,
  }: CheckboxProps & Omit<HTMLProps<HTMLInputElement>, 'label' | 'onChange'>,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <CheckboxWrapperStyled
      className={className}
      $checked={checked}
      $state={state}
      $disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <CheckboxStyled
        $width={width}
        $height={height}
        $checked={checked}
        $state={state}
        $disabled={disabled}
      >
        <HiddenStyled
          type='checkbox'
          ref={ref}
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <VisibleStyled $checked={checked} $state={state} $disabled={disabled}>
          <CheckedStyled $disabled={disabled} $state={state} />
        </VisibleStyled>
      </CheckboxStyled>
      {label && (
        <LabelStyled
          type='p-2'
          as='span'
          onClick={(e) => {
            e.preventDefault();
            onChange(!checked);
          }}
        >
          {label}
        </LabelStyled>
      )}
    </CheckboxWrapperStyled>
  );
};

export default forwardRef(Checkbox);
