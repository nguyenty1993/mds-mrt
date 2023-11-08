import React, { HTMLAttributes, ReactElement } from 'react';

import ReactDOM from 'react-dom';

import { styled } from '../../styled';
import useBodyPortal from '../../hooks/useBodyPortal';
import { respondTo } from '../../utils';

interface Props {
  children: ReactElement;
  className?: string;
  withPortal?: boolean;
  responsive?: {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
  };
}

const FixedBottomPortalId = 'fixed-bottom-portal';

const FixedBottomStyled = styled.div<{
  $responsive: {
    xs?: boolean;
    md?: boolean;
    lg?: boolean;
  };
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${respondTo.sm`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  `}
  ${respondTo.md`
    position: unset;
  `}
  ${respondTo.lg`
    position: unset;
  `}
`;

const FixedBottomContent = ({
  children,
  responsive = { sm: true, md: false, lg: false },
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <FixedBottomStyled {...rest} $responsive={responsive}>
      {children}
    </FixedBottomStyled>
  );
};

const FixedBottom = ({ withPortal, ...rest }: Props) => {
  const { ready, target } = useBodyPortal(FixedBottomPortalId);

  if (!ready) {
    return null;
  }

  if (!withPortal) {
    return <FixedBottomContent {...rest} />;
  }

  return ReactDOM.createPortal(<FixedBottomContent {...rest} />, target);
};

export default FixedBottom;
