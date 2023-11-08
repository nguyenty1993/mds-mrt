import React, { HTMLAttributes, PropsWithChildren, ReactHTML } from 'react';

import { styled } from '../../styled';
import { breakpointCssFactory } from '../../utils';
import { BreakPointTo } from '../molecules/menu/types';

type Weight = 'semibold' | 'medium' | 'regular';

type TypographyPlainType =
  | 'h-1'
  | 'h-2'
  | 'h-3'
  | 'h-4'
  | 'h-5'
  | 'h-6'
  | 'p-1'
  | 'p-2'
  | 'p-3'
  | 'p-4'
  | 'p-5'
  | 'p-6';

const TypeSizes: { [key in TypographyPlainType]: number } = {
  ['h-1']: 48,
  ['h-2']: 40,
  ['h-3']: 36,
  ['h-4']: 32,
  ['h-5']: 24,
  ['h-6']: 20,
  ['p-1']: 18,
  ['p-2']: 16,
  ['p-3']: 14,
  ['p-4']: 12,
  ['p-5']: 10,
  ['p-6']: 8,
};

const TypeWeights: { [key in Weight]: number } = {
  ['semibold']: 600,
  ['medium']: 500,
  ['regular']: 400,
};

const TypeLineHeight: { [key in TypographyPlainType]: string } = {
  ['h-1']: '125%',
  ['h-2']: '125%',
  ['h-3']: '125%',
  ['h-4']: '125%',
  ['h-5']: '125%',
  ['h-6']: '125%',
  ['p-1']: '150%',
  ['p-2']: '150%',
  ['p-3']: '150%',
  ['p-4']: '150%',
  ['p-5']: '150%',
  ['p-6']: '150%',
};

interface Props {
  type: BreakPointTo<TypographyPlainType> | TypographyPlainType;
  color?: string;
  weight?: Weight;
  as?: keyof ReactHTML;
}

const TypograhpyStyled = styled.span<{
  $type: BreakPointTo<TypographyPlainType>;
  $weight: Weight;
  $color: string;
}>`
  ${(props) =>
    `
    ${breakpointCssFactory(
      'sm',
      `font-size: ${TypeSizes[props.$type.sm]}px;
      line-height: ${TypeLineHeight[props.$type.sm]};`,
    )}
    ${breakpointCssFactory(
      'md',
      `font-size: ${TypeSizes[props.$type.md]}px;
      line-height: ${TypeLineHeight[props.$type.md]};`,
    )}
    ${breakpointCssFactory(
      'lg',
      `font-size: ${TypeSizes[props.$type.lg]}px;
      line-height: ${TypeLineHeight[props.$type.lg]};`,
    )}
    ${breakpointCssFactory(
      'xl',
      `font-size: ${TypeSizes[props.$type.xl]}px;
      line-height: ${TypeLineHeight[props.$type.xl]};`,
    )}
    `}
  font-weight: ${(props) => TypeWeights[props.$weight]};
  color: ${(props) => props.$color};
`;

function mediaFactory(
  type: BreakPointTo<TypographyPlainType> | TypographyPlainType,
): BreakPointTo<TypographyPlainType> {
  if (typeof type === 'string') {
    return { sm: type, md: type, lg: type, xl: type };
  }

  return {
    sm: type.sm ?? type.md ?? type.lg ?? type.lg,
    md: type.md ?? type.sm ?? type.lg ?? type.xl,
    lg: type.lg ?? type.md ?? type.sm ?? type.xl,
    xl: type.xl ?? type.lg ?? type.md ?? type.sm,
  };
}

function Typography({
  color = '#212121',
  weight = 'regular',
  type,
  as,
  children,
  ...rest
}: PropsWithChildren<Props> & HTMLAttributes<any>) {
  return (
    <TypograhpyStyled
      $type={mediaFactory(type)}
      $color={color}
      $weight={weight}
      as={as}
      {...rest}
    >
      {children}
    </TypograhpyStyled>
  );
}

export default Typography;
