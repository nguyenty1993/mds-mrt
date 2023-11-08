import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  UIEvent,
  cloneElement,
  useEffect,
} from 'react';

import ReactDOM from 'react-dom';

import { styled } from '../../styled';
import useBodyPortal from '../../hooks/useBodyPortal';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  clickOutside?: boolean;
  withPortal?: boolean;
}

const ModalPortalId = 'modal-portal';

const ModalStyled = styled.div`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = (
  props: PropsWithChildren<Props> & HTMLAttributes<any>,
) => {
  const { isOpen, toggle, clickOutside = true, children, className } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalStyled
      onClick={() => {
        if (clickOutside) {
          toggle();
        }
      }}
      className={className}
    >
      {cloneElement(children as ReactElement, {
        onClick: (e: UIEvent<HTMLElement>) => e.stopPropagation(),
      })}
    </ModalStyled>
  );
};

const ModalPortal = ({
  withPortal = true,
  ...rest
}: PropsWithChildren<Props> & HTMLAttributes<any>) => {
  const { ready, target } = useBodyPortal(ModalPortalId);

  if (!ready) {
    return null;
  }

  if (withPortal) {
    return ReactDOM.createPortal(<ModalContent {...rest} />, target as Element);
  }

  return <ModalContent {...rest} />;
};

export default ModalPortal;
