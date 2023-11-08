import React from 'react';
import { SVGProps } from 'react';
const SearchOutlineSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    data-custo='stroke'
    {...props}
    fill='none'
  >
    <circle
      cx={11}
      cy={11}
      r={6}
      stroke={props.fill ?? '#BDBDBD'}
      strokeWidth={1.5}
    />
    <path
      d='M20 20L17 17'
      stroke={props.fill ?? '#BDBDBD'}
      strokeWidth={1.5}
      strokeLinecap='round'
    />
  </svg>
);
export default SearchOutlineSvg;
