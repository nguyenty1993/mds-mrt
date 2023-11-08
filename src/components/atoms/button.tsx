import React, {
  ComponentPropsWithRef,
  ReactElement,
  Ref,
  forwardRef,
  useMemo,
} from 'react';
import { PropsWithChildren } from 'react';

import { styled } from '../../styled';
import { theme } from '../../utils';

export type ButtonType = 'primary' | 'secondary' | 'outline' | 'text' | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonState =
  | 'success'
  | 'danger'
  | 'warning'
  | 'focus'
  | 'default';

export type ButtonShape = 'default' | 'circle' | 'round';

const fontSizes = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};
const heights = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

const iconSizes = {
  sm: 16,
  md: 16,
  lg: 20,
  xl: 20,
};

const colors: {
  [key in ButtonType]: { [key in ButtonState]: string } | string;
} = {
  primary: '#fff',
  secondary: {
    success: theme.colors['primary'],
    danger: theme.colors['error-500'],
    warning: theme.colors['tertiary-500'],
    focus: theme.colors['tertiary-500'],
    default: theme.colors['primary'],
  },
  outline: {
    success: theme.colors['primary'],
    danger: theme.colors['error-500'],
    warning: theme.colors['tertiary-500'],
    focus: theme.colors['tertiary-500'],
    default: theme.colors['neutral-600'],
  },
  text: theme.colors['neutral-600'],
  link: theme.colors['primary'],
};

const backgrounds: {
  [key in ButtonType]: { [key in ButtonState]: string } | string;
} = {
  primary: {
    success: theme.colors['primary'],
    danger: theme.colors['error-500'],
    warning: theme.colors['tertiary-500'],
    focus: theme.colors['tertiary-500'],
    default: theme.colors['primary'],
  }, // change by state
  secondary: {
    success: theme.colors['primary-50'],
    danger: theme.colors['error-50'],
    warning: theme.colors['tertiary-50'],
    focus: theme.colors['tertiary-50'],
    default: theme.colors['primary-50'],
  },
  outline: '#fff',
  text: '#fff',
  link: 'transparent',
};

const hoveredBackgrounds: {
  [key in ButtonType]: { [key in ButtonState]: string } | string;
} = {
  primary: {
    success: theme.colors['primary-700'],
    danger: theme.colors['error-700'],
    warning: theme.colors['tertiary-700'],
    focus: theme.colors['tertiary-700'],
    default: theme.colors['primary-700'],
  }, // change by state
  secondary: {
    success: theme.colors['primary-100'],
    danger: theme.colors['error-100'],
    warning: theme.colors['tertiary-100'],
    focus: theme.colors['tertiary-100'],
    default: theme.colors['primary-100'],
  },
  outline: {
    success: theme.colors['primary-50'],
    danger: theme.colors['error-50'],
    warning: theme.colors['tertiary-50'],
    focus: theme.colors['tertiary-50'],
    default: theme.colors['primary-50'],
  },
  text: {
    success: theme.colors['primary-50'],
    danger: theme.colors['error-50'],
    warning: theme.colors['tertiary-50'],
    focus: theme.colors['tertiary-50'],
    default: theme.colors['primary-50'],
  },
  link: 'transparent',
};

const StyledButton = styled.button<{
  $buttonType: ButtonType;
  $buttonSize: ButtonSize;
  $buttonState: ButtonState;
  $buttonShape: ButtonShape;
  $iconOnly: boolean;
  $ghost: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => `${fontSizes[props.$buttonSize]}px`};
  line-height: 150%;
  font-weight: 600;
  color: ${(props) => {
    if (props.$ghost) {
      if (typeof backgrounds[props.$buttonType] === 'string') {
        return backgrounds[props.$buttonType];
      }

      return (
        backgrounds[props.$buttonType] as { [key in ButtonState]: string }
      )[props.$buttonState];
    }

    if (typeof colors[props.$buttonType] === 'string') {
      return colors[props.$buttonType];
    }

    return (colors[props.$buttonType] as { [key in ButtonState]: string })[
      props.$buttonState
    ];
  }};

  padding: ${(props) => {
    if (props.$iconOnly) {
      return `${
        (heights[props.$buttonSize] - iconSizes[props.$buttonSize]) / 2
      }px`;
    }
    return `${
      (heights[props.$buttonSize] - fontSizes[props.$buttonSize] * 1.5) / 2
    }px 16px`;
  }};

  height: ${(props) => `${heights[props.$buttonSize]}px`};

  background: ${(props) => {
    if (props.$ghost) {
      return 'transparent';
    }

    if (typeof backgrounds[props.$buttonType] === 'string') {
      return backgrounds[props.$buttonType];
    }

    return (backgrounds[props.$buttonType] as { [key in ButtonState]: string })[
      props.$buttonState
    ];
  }};

  border-radius: ${(props) => {
    if (props.$buttonShape === 'circle') {
      return '50%';
    }
    if (props.$buttonShape === 'round') {
      return `${heights[props.$buttonSize]}px`;
    }

    return {
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
    }[props.$buttonSize];
  }};
  border: ${(props) => {
    if (props.$ghost) {
      return `1px solid ${(function () {
        if (typeof backgrounds[props.$buttonType] === 'string') {
          return backgrounds[props.$buttonType];
        }

        return (
          backgrounds[props.$buttonType] as { [key in ButtonState]: string }
        )[props.$buttonState];
      })()}`;
    }

    // only outline support border
    if (props.$buttonType === 'outline') {
      return `1px solid ${(function () {
        if (typeof colors[props.$buttonType] === 'string') {
          return colors[props.$buttonType];
        }

        return (colors[props.$buttonType] as { [key in ButtonState]: string })[
          props.$buttonState
        ];
      })()}`;
    }

    return 'none';
  }};

  &:hover {
    background: ${(props) => {
      if (props.$ghost) {
        return 'transparent';
      }

      if (typeof hoveredBackgrounds[props.$buttonType] === 'string') {
        return hoveredBackgrounds[props.$buttonType];
      }

      return (
        hoveredBackgrounds[props.$buttonType] as {
          [key in ButtonState]: string;
        }
      )[props.$buttonState];
    }};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

function Button(
  {
    buttonType = 'primary',
    buttonSize = 'md',
    buttonState = 'default',
    buttonShape = 'default',
    ghost = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled = false,
    style = {},
    children,
    onClick,
    ...rest
  }: PropsWithChildren<{
    buttonType?: ButtonType;
    buttonSize?: ButtonSize;
    buttonState?: ButtonState;
    buttonShape?: ButtonShape;
    ghost?: boolean;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    className?: string;
    style?: any;
    onClick?: any;
    disabled?: boolean;
  }> &
    ComponentPropsWithRef<'button'>,
  ref: Ref<HTMLButtonElement>,
) {
  const color = useMemo(() => {
    if (ghost) {
      if (typeof backgrounds[buttonType] === 'string') {
        return backgrounds[buttonType];
      }

      return (backgrounds[buttonType] as { [key in ButtonState]: string })[
        buttonState
      ];
    }

    if (typeof colors[buttonType] === 'string') {
      return colors[buttonType];
    }

    return (colors[buttonType] as { [key in ButtonState]: string })[
      buttonState
    ];
  }, [buttonState, buttonType, ghost]);

  return (
    <StyledButton
      $buttonType={buttonType}
      $buttonSize={buttonSize}
      $buttonState={buttonState}
      $buttonShape={buttonShape}
      $iconOnly={(leftIcon || rightIcon) && !children}
      $ghost={ghost}
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {leftIcon &&
        React.cloneElement(leftIcon, ({ ...xx }) => {
          console.log(xx);
          return {
            width: iconSizes[buttonSize],
            height: iconSizes[buttonSize],
            color: color,
            style: { marginRight: children ? '8px' : '0px' },
          };
        })}
      {children}
      {rightIcon &&
        React.cloneElement(rightIcon, ({ ...xx }) => {
          console.log(xx);
          return {
            width: iconSizes[buttonSize],
            height: iconSizes[buttonSize],
            color: color,
            style: { marginLeft: children ? '8px' : '0px' },
          };
        })}
    </StyledButton>
  );
}

export default forwardRef(Button);
