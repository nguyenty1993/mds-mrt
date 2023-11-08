import React, { HTMLAttributes } from 'react';

import { styled } from '../../styled';

type Direction = 'horizontal' | 'vertical';

interface DividerProps {
  color?: string;
  direction?: Direction;
  spacing?: number;
}

const StyledDivider = styled.div<{
  $color: string;
  $direction: Direction;
  $spacing: number;
}>`
  background-color: ${(props) => props.$color};
  margin: ${(props) => `${props.$spacing}px 0px`};
  width: ${(props) => {
    if (props.$direction === 'horizontal') {
      return '100%';
    }
    return '1px';
  }};
  height: ${(props) => {
    if (props.$direction === 'vertical') {
      return '100%';
    }
    return '1px';
  }};
`;

const Divider = ({
  color = '#C4C4C4',
  direction = 'horizontal',
  spacing = 24,
  ...rest
}: DividerProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledDivider
      $color={color}
      $direction={direction}
      $spacing={spacing}
      {...rest}
    />
  );
};

export default Divider;
