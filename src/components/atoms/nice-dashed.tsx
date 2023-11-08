import React, { HTMLAttributes } from 'react';

import { styled } from '../../styled';

interface DashedProps {
  direction?: 'vertical' | 'horizontal';
  length?: number;
  color?: string;
}

// TODO: read this article carefuly
// https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes
const DashedStyled = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $length: number;
  $color: string;
}>`
  border-radius: 5px;
  width: ${(props: any) =>
    props.$direction === 'vertical' ? '2px' : `${props.$length}px` ?? '70px'};
  height: ${(props: any) =>
    props.$direction === 'horizontal' ? '2px' : `${props.$length}px` ?? '70px'};
  background-image: repeating-linear-gradient(
      to right,
      ${(props: any) => props.$color} 0%,
      ${(props: any) => props.$color} 50%,
      transparent 50%,
      transparent 100%
    ),
    repeating-linear-gradient(
      to right,
      ${(props: any) => props.$color} 0%,
      ${(props: any) => props.$color} 50%,
      transparent 50%,
      transparent 100%
    ),
    repeating-linear-gradient(
      to bottom,
      ${(props: any) => props.$color} 0%,
      ${(props: any) => props.$color} 50%,
      transparent 50%,
      transparent 100%
    ),
    repeating-linear-gradient(
      to bottom,
      ${(props: any) => props.$color} 0%,
      ${(props: any) => props.$color} 50%,
      transparent 50%,
      transparent 100%
    );
  background-position: left top, left bottom, left top, right top;
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 3px, 15px 3px, 3px 15px, 3px 15px;
`;

const NiceDashed = ({
  className,
  direction = 'vertical',
  length = 70,
  color = '#219b67',
  ...rest
}: DashedProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <DashedStyled
      {...rest}
      className={className}
      $direction={direction}
      $length={length}
      $color={color}
    />
  );
};

export default NiceDashed;
