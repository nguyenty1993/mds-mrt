import React, { HTMLAttributes } from 'react';
import { styled } from '../../styled';

type ArrowDirection = 'left' | 'right' | 'up' | 'down';

interface Props {
  width?: string;
  borderWidth?: string;
  color?: string;
  className?: string;
  direction?: ArrowDirection;
}

const ArrowStyled = styled.i<{
  $width?: string;
  $borderWidth?: string;
  $color?: string;
  $direction?: ArrowDirection;
}>`
  border: solid black;
  border-width: 0 ${(props) => props.$borderWidth || '1px'}
    ${(props) => props.$borderWidth || '1px'} 0;
  display: inline-block;
  padding: ${(props) => props.$width || '4px'};
  border-color: ${(props) => props.$color || '#424242'};

  transform: ${(props) => {
    return {
      right: 'rotate(-45deg)',
      left: 'rotate(135deg)',
      up: 'rotate(-135deg)',
      down: 'rotate(45deg)',
    }[props.$direction];
  }};
  -webkit-transform: ${(props) => {
    return {
      right: 'rotate(-45deg)',
      left: 'rotate(135deg)',
      up: 'rotate(-135deg)',
      down: 'rotate(45deg)',
    }[props.$direction];
  }};
`;

const Arrow = ({
  direction,
  className,
  width,
  borderWidth,
  color,
  ...rest
}: Props & HTMLAttributes<HTMLElement>) => {
  return (
    <ArrowStyled
      {...rest}
      className={className}
      $direction={direction}
      $color={color}
      $width={width}
      $borderWidth={borderWidth}
    />
  );
};

export default Arrow;
