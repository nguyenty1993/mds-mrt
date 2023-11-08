import React from 'react';

import { styled } from '../../styled';

interface DiamondTileProps {
  className?: string;
  color: string;
  children?: React.ReactElement | string;
}

const DiamondTileContainer = styled.div<{ $color: string }>`
  transform: rotateX(45deg) rotateZ(-45deg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: -4px 4px 0px 0px ${(props) => props.$color},
    -20px 20px 30px 0px #bdbdbd;
  background: #f6f5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color};
  width: 70px;
  height: 70px;
`;

const DiamondTile = ({ children, color, ...rest }: DiamondTileProps) => {
  return (
    <DiamondTileContainer {...rest} $color={color}>
      {children}
    </DiamondTileContainer>
  );
};

export default DiamondTile;
