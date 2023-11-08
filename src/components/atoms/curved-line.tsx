import React, { HTMLAttributes, PropsWithChildren, ReactHTML } from 'react';

import { styled } from '../../styled';

interface CurvedLineProps {
  direction?: 'vertical' | 'horizontal';
  length?: number;
  color?: string;
  size: 'sm' | 'md' | 'lg';
  as?: keyof ReactHTML;
}

// TODO: finish styling for md, lg size
const CurvedLineStyled = styled.p<{
  $color?: string;
  $size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-block;
  position: relative;
  ${(props) =>
    props.$size === 'sm' &&
    `::after {
    content: '';
    margin-left: -2px;
    position: absolute;
    display: block;
    width: calc(100% + 4px);
    height: 10px;
    border: solid 2px #000;
    border-color: ${
      props.$color ?? 'white'
    } transparent transparent transparent;
    border-radius: 100%/10px 14px 0 0;
  }`}
  ${(props) =>
    props.$size === 'md' &&
    `::after {
    content: '';
    margin-left: -2px;
    position: absolute;
    display: block;
    width: calc(100% + 4px);
    height: 10px;
    border: solid 2px #000;
    border-color: ${
      props.$color ?? 'white'
    } transparent transparent transparent;
    border-radius: 100%/10px 14px 0 0;
  }`}
  ${(props) =>
    props.$size === 'lg' &&
    `::after {
    content: '';
    margin-left: -2px;
    position: absolute;
    display: block;
    width: calc(100% + 4px);
    height: 20px;
    border: solid 7px #000;
    border-color: ${
      props.$color ?? 'white'
    } transparent transparent transparent;
    border-radius: 100%/25px 20px 0 0;
  }`}
`;

const CurvedLine = ({
  children,
  color,
  size,
  as = 'p',
  ...rest
}: PropsWithChildren<CurvedLineProps> & HTMLAttributes<HTMLElement>) => {
  return (
    <CurvedLineStyled {...rest} $color={color} $size={size} as={as}>
      {children}
    </CurvedLineStyled>
  );
};

export default CurvedLine;
