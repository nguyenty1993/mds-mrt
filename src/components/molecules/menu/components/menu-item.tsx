import React, { HTMLProps, PropsWithChildren } from 'react';

import SmallRightArrowSvg from '../../../../icons/small-right-arrow.svg';
import { getTheme, theme } from '../../../../utils';
import { styled } from '../../../../styled';

type MenuItemVariant = 'underline' | 'rounded' | 'highlight';

interface MenuItemProps {
  active?: boolean;
  variant?: MenuItemVariant;
  withIcon?: boolean;
  withHover?: boolean;
  disabled?: boolean;
  badge?: boolean;
  target?: string;
}

const MenuItemStyled = styled.a<{
  $disabled: boolean;
  $active: boolean;
  $variant: MenuItemVariant;
  $withHover: boolean;
}>`
  display: block;
  position: relative;
  color: ${(props) => {
    if (props.$disabled) {
      return getTheme(props.theme).colors['neutral-400'];
    }
    return props.$active
      ? getTheme(props.theme).colors['primary']
      : getTheme(props.theme).colors['secondary-900'];
  }};
  font-weight: 500;
  font-size: 14px;
  cursor: ${(props) => {
    if (props.$disabled) {
      return 'default';
    }

    return 'pointer';
  }};
  padding: ${(props) => {
    if (props.$variant === 'rounded') {
      return '8px';
    }

    return '8px 0px';
  }};
  margin: ${(props) => {
    if (props.$variant === 'rounded') {
      return '0 -8px';
    }

    return 'unset';
  }};
  background: ${(props) => {
    if (props.$variant === 'rounded' && props.$active) {
      return getTheme(props.theme).colors['primary-50'];
    }

    return '#ffffff';
  }};
  border-radius: ${(props) => {
    if (props.$variant === 'rounded') {
      return '8px';
    }

    return 'unset';
  }};

  // in-case sub sub sub menu , that so stupid
  ${(props) =>
    props.$withHover
      ? `&:hover {color: #${getTheme(props.theme).colors['primary']};}`
      : ''}

  &:after {
    content: '';
    display: ${(props) => {
      if (props.$disabled) {
        return 'none';
      }
      return props.$variant === 'underline' ? 'block' : 'none';
    }};
    position: absolute;
    bottom: 0;
    left: 0; // by the padding x
    right: 0; // by the padding x
    height: 2px;
    background: ${(props) =>
      props.$active ? getTheme(props.theme).colors['primary'] : 'transparent'};
  }
  &:hover {
    color: ${(props) => {
      if (props.$disabled) {
        return getTheme(props.theme).colors['neutral-400'];
      }
      return props.$active
        ? getTheme(props.theme).colors['primary-600']
        : getTheme(props.theme).colors['secondary-900'];
    }};
  }

  &.with-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .badge {
    width: 8px;
    height: 8px;
    background-color: ${(props) => getTheme(props.theme).colors['primary']};
    margin-left: 6px;
    margin-top: -6px;
    border-radius: 50%;
  }
`;

function MenuItem({
  active = false,
  variant = 'underline',
  className = '',
  style = {},
  children,
  onMouseEnter,
  onMouseLeave,
  onClick,
  withIcon = false,
  withHover = false,
  href = '#',
  disabled = false,
  badge = false,
  target = '_self',
}: PropsWithChildren<MenuItemProps> & HTMLProps<HTMLAnchorElement>) {
  return (
    <MenuItemStyled
      $variant={variant}
      $active={active}
      target={target}
      className={`${className} ${withIcon || badge ? 'with-icon' : ''}`}
      style={style}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      $withHover={withHover}
      $disabled={disabled}
    >
      {children}
      {badge && <div className='badge' />}
      {withIcon && (
        <SmallRightArrowSvg
          width={12}
          height={12}
          fill={
            active ? theme.colors['primary'] : theme.colors['secondary-900']
          }
        />
      )}
    </MenuItemStyled>
  );
}

export default MenuItem;
