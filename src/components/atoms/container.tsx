import React, { HTMLAttributes } from 'react';

import { styled } from '../../styled';
import { respondTo } from '../../utils';

const StyledContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  ${respondTo.xl`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
    padding-right: 0;
  `}
`;
export interface ContainerProps {
  as?: React.ElementType;
}

function Container({
  children,
  as,
  ...rest
}: React.PropsWithChildren<ContainerProps> & HTMLAttributes<HTMLElement>) {
  return (
    <StyledContainer as={as} {...rest}>
      {children}
    </StyledContainer>
  );
}

export default Container;
