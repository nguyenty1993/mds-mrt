import React, { HTMLAttributes, PropsWithChildren, ReactHTML } from 'react';
import isEmpty from 'lodash/isEmpty';

import { styled } from '../../styled';
import { breakpointCssFactory } from '../../utils';
import { BreakPointTo } from '../molecules/menu/types';

type GridAlign = 'top' | 'middle';

type GridJustify = 'start' | 'space-between' | 'end' | 'center';

type Col = number | BreakPointTo<number>;

type Gutter = number | BreakPointTo<number>;

type ColSpan = number | BreakPointTo<number>;

type Order = number | BreakPointTo<number>;

interface GridProps {
  col?: Col;
  align?: GridAlign;
  gutter?: Gutter;
  justify?: GridJustify;
}

const GridStyled = styled.div<{
  $col: BreakPointTo<number>;
  $gutter?: BreakPointTo<number>;
  $align?: GridAlign;
  $justify?: GridJustify;
}>`
  display: grid;

  grid-template-columns: repeat(${(props) => props.$col.sm}, minmax(0, 1fr));
  gap: ${(props) => props.$gutter.sm}px;

  ${(props) => {
    return `
    ${breakpointCssFactory(
      'md',
      `grid-template-columns: repeat(${props.$col.md}, minmax(0, 1fr));
      gap: ${props.$gutter.md}px;
      `,
    )} ${breakpointCssFactory(
      'lg',
      `grid-template-columns: repeat(${props.$col.lg}, minmax(0, 1fr));
      gap: ${props.$gutter.lg}px;
      `,
    )} ${breakpointCssFactory(
      'xl',
      `grid-template-columns: repeat(${props.$col.xl}, minmax(0, 1fr));
      gap: ${props.$gutter.xl}px;
      `,
    )} ${breakpointCssFactory(
      'hg',
      `grid-template-columns: repeat(${props.$col.hg}, minmax(0, 1fr));
      gap: ${props.$gutter.hg}px;
      `,
    )}`;
  }}
`;

function mediaFactory(
  css: Col | Gutter | Order | ColSpan,
): BreakPointTo<number> {
  if (typeof css === 'number') {
    return { md: css, sm: css, lg: css, xl: css, hg: css };
  }

  if (isEmpty(css)) {
    return { sm: 1, md: 1, lg: 1, xl: 1, hg: 1 };
  }
  return {
    sm: css.sm ?? css.md ?? css.lg ?? css.xl ?? css.hg,
    md: css.md ?? css.sm ?? css.lg ?? css.xl ?? css.hg,
    lg: css.lg ?? css.md ?? css.sm ?? css.xl ?? css.hg,
    xl: css.xl ?? css.lg ?? css.md ?? css.sm ?? css.hg,
    hg: css.hg ?? css.xl ?? css.lg ?? css.md ?? css.sm,
  };
}

function Grid({
  children,
  col = 1,
  align = 'top',
  justify = 'start',
  gutter = 0,
  ...rest
}: PropsWithChildren<GridProps> & HTMLAttributes<HTMLElement>) {
  return (
    <GridStyled
      $col={mediaFactory(col)}
      $align={align}
      $justify={justify}
      $gutter={mediaFactory(gutter)}
      {...rest}
    >
      {children}
    </GridStyled>
  );
}

const GridColStyled = styled.div<{
  $span: BreakPointTo<number>;
  $order: BreakPointTo<number>;
}>`
  grid-column: ${(props) =>
    props.$span.sm > 0
      ? `span ${props.$span.sm} / span ${props.$span.sm}`
      : 'none'};
  order: ${(props) => props.$order.sm};
  ${(props) => {
    return `
      ${breakpointCssFactory(
        'md',
        `
          grid-column: ${
            props.$span.md > 0
              ? `span ${props.$span.md} / span ${props.$span.md}`
              : 'none'
          };
          order: ${props.$order.md};
        `,
      )} 
      ${breakpointCssFactory(
        'lg',
        `
        grid-column: ${
          props.$span.lg > 0
            ? `span ${props.$span.lg} / span ${props.$span.lg}`
            : 'none'
        };
          order: ${props.$order.lg};
        `,
      )} 
      ${breakpointCssFactory(
        'xl',
        `
        grid-column: ${
          props.$span.xl > 0
            ? `span ${props.$span.xl} / span ${props.$span.xl}`
            : 'none'
        };
          order: ${props.$order.xl};
        `,
      )}
      ${breakpointCssFactory(
        'hg',
        `
        grid-column: ${
          props.$span.hg > 0
            ? `span ${props.$span.hg} / span ${props.$span.hg}`
            : 'none'
        };
          order: ${props.$order.hg};
        `,
      )}`;
  }}
`;

function GridCol({
  children,
  span,
  order = 1,
  as,
  ...rest
}: PropsWithChildren<{
  span: ColSpan;
  order?: Order;
  as?: keyof ReactHTML;
}> &
  HTMLAttributes<HTMLElement>) {
  return (
    <GridColStyled
      $span={mediaFactory(span)}
      $order={mediaFactory(order)}
      as={as}
      {...rest}
    >
      {children}
    </GridColStyled>
  );
}

Grid.Col = GridCol;

export default Grid;
