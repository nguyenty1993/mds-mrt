import React, { PropsWithChildren } from 'react';

import { styled } from '../../styled';

type SidebarPosition = 'right' | 'bottom' | 'left';

interface DrawerProps {
  title?: string | JSX.Element;
  position?: SidebarPosition;
  open: boolean;
  border?: boolean;
  block?: boolean;
  close: () => void;
  className?: string;
}

export const DRAWER_TRANSITION_SECONDS = 0.5;

const BackdropStyled = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  top: 56px; // header height
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 9997;
`;

const DrawerContainerStyled = styled.div`
  width: 100%;
  height: calc(100% - 56px);
`;

const SideNavStyled = styled.div<{
  $block: boolean;
}>`
  height: 100%;
  position: fixed;
  z-index: 9998;
  top: 0;
  background-color: white;
  overflow-x: hidden;
  transition: ${DRAWER_TRANSITION_SECONDS}s;

  &[data-position='right'] {
    top: 56px;
    width: ${(props) => (props.$block ? '100%' : '310px')};
    right: -310px;
    &[data-isopen='true'] {
      right: 0px;
    }
  }

  &[data-position='left'] {
    top: 56px;
    width: ${(props) => (props.$block ? '100%' : '310px')};
    left: -310px;
    &[data-isopen='true'] {
      left: 0px;
    }
  }

  &[data-position='bottom'] {
    height: ${(props) => (props.$block ? '100vh' : '70vh')};
    border-radius: ${(props) => (props.$block ? 'unset' : '1rem 1rem 0 0')};
    bottom: -70vh;
    top: unset;
    width: 100%;
    &[data-isopen='true'] {
      bottom: 0;
    }
  }

  @media screen and (max-height: 450px) {
    padding-top: 15px;
    a {
      font-size: 18px;
    }
  }
`;

function Drawer({
  close,
  open,
  children,
  className = '',
  block,
  position,
}: PropsWithChildren<DrawerProps>) {
  // Add a keyboard event to close all modals
  const closeDrawer = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Escape key
        close();
      }
    },
    [close],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', closeDrawer);
    return () => {
      document.removeEventListener('keydown', closeDrawer);
    };
  }, [closeDrawer]);

  // prevent body scrolling when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div>
      <BackdropStyled onClick={close} />
      <SideNavStyled
        data-isopen={open}
        data-position={position || 'right'}
        $block={block}
        className={className}
      >
        <DrawerContainerStyled>{children}</DrawerContainerStyled>
      </SideNavStyled>
    </div>
  );
}

export default Drawer;
