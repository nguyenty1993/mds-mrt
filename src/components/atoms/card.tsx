import React, { PropsWithChildren } from 'react';

import { styled } from '../../styled';

interface CardProps {
  className?: string;
}

const CardStyled = styled.div`
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

function Card({ children, className }: PropsWithChildren<CardProps>) {
  return <CardStyled className={className}>{children}</CardStyled>;
}

export default Card;
