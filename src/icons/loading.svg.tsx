/* eslint-disable no-undef */
// 🔴 DO NOT EDIT — This file is generated.
import * as React from 'react';
import { SVGProps } from 'react';

import { styled } from '../styled';

const SvgStyled = styled.svg`
  animation: spin 1s linear infinite;
  margin-left: -0.25rem;
  margin-right: 0.75rem;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
`;
const CircleStyled = styled.circle`
  opacity: 0.25;
`;
const PathStyled = styled.path`
  opacity: 0.75;
`;
const LoadingSvg = (props: SVGProps<SVGSVGElement>) => (
  <SvgStyled
    width='1em'
    height='1em'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <CircleStyled
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <PathStyled
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </SvgStyled>
);

export default LoadingSvg;
