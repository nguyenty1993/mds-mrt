import React, { HTMLAttributes, ReactNode, useCallback, useState } from 'react';

import { styled } from '../../styled';
import { theme } from '../../utils';
import Arrow from './arrow';

interface CollapseProps {
  title: ReactNode;
  content: (open: boolean) => ReactNode;
  titleClassName?: string;
  initActive?: boolean;
  className?: string;
}

const CollapseStyled = styled.div<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  width: 100%;
  color: ${(props) => {
    return props.$open ? '#219B67' : '#424242';
  }};
  background-color: ${(props) => theme.colors['primary-50']};
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

const BodyStyled = styled.div<{ $open: boolean }>`
  max-height: ${(props) => (props.$open ? 'auto' : '0')};
  overflow: hidden;
  transition: max-height 0.3s;
`;

const Collapse = ({
  title,
  titleClassName,
  content,
  className,
  style,
  initActive = false,
}: CollapseProps & Omit<HTMLAttributes<HTMLButtonElement>, 'title'>) => {
  const [open, setOpen] = useState(initActive);

  const handleToggle = useCallback(() => setOpen(!open), [open]);

  return (
    <div className={className} style={style}>
      <CollapseStyled
        className={titleClassName}
        $open={open}
        onClick={handleToggle}
      >
        {title}
        <Arrow
          direction={`${open ? 'up' : 'down'}`}
          borderWidth='1px'
          color={`${open ? '#219B67' : '#424242'}`}
          width='5px'
        />
      </CollapseStyled>
      <BodyStyled $open={open}>{content(open)}</BodyStyled>
    </div>
  );
};

export default Collapse;
