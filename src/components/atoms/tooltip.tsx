import React, {
  CSSProperties,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

import { styled } from '../../styled';
import useBodyPortal from '../../hooks/useBodyPortal';

type Triggers = 'click' | 'hover';

const TooltipPortalId = 'tooltip-portal';

interface Props {
  children: ReactElement;
  title?: ReactElement | null | string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  trigger?: Triggers[];
}

const TooltipContainerStyled = styled.div`
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
  max-width: calc(100vw - 64px);

  > div {
    width: 100%;
    height: 100%;
    padding: 8px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
    color: #ffffff;
    font-size: 14px;
  }

  > span {
    bottom: 0;
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.75);
  }
`;

const TooltipCard = ({
  title = null,
  className = '',
  style,
  open = false,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  title?: ReactElement | null | string;
  className?: string;
  style: CSSProperties;
  open?: boolean;
  onClick: any;
  onPointerEnter: any;
  onPointerLeave: any;
}) => {
  if (!open) {
    return null;
  }

  return (
    <TooltipContainerStyled
      className={className}
      style={style}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div>{title}</div>
      <span />
    </TooltipContainerStyled>
  );
};

function boundingToPosition(
  bounding: DOMRect,
  anchorHeight: number,
  anchorWidth: number,
): CSSProperties {
  return {
    bottom: window.innerHeight - bounding.top,
    left: bounding.left + anchorWidth / 2,
    transform: 'translateX(-50%)',
    position: 'fixed',
  };
}

function doNothing(): void {
  return null;
}

const Tooltip = ({
  open = false,
  onOpenChange = () => undefined,
  className = '',
  children,
  title = null,
  trigger = ['hover'],
}: PropsWithChildren<Props> & ComponentPropsWithoutRef<'div'>) => {
  const { ready, target } = useBodyPortal(TooltipPortalId);

  const [openInternal, setOpenInternal] = useState(open);
  const [position, setPosition] = useState<CSSProperties>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'unset',
  });
  const ref = useRef<HTMLDivElement>(null);
  const eventListenerRef = useRef<any>(null);

  const triggerHandler = useCallback(
    (open: boolean) => {
      if (ref.current) {
        const positionPerWindow = ref.current.getBoundingClientRect();

        setPosition(
          boundingToPosition(
            positionPerWindow,
            ref.current.clientHeight,
            ref.current.clientWidth,
          ),
        );
      }

      setOpenInternal(open);
      onOpenChange(open);
    },
    [onOpenChange],
  );

  const onClick = useCallback(
    () =>
      (trigger.includes('click') ? triggerHandler : doNothing)(!openInternal),
    [trigger, triggerHandler, openInternal],
  );

  const onPointerEnter = useCallback(
    () => (trigger.includes('hover') ? triggerHandler : doNothing)(true),
    [triggerHandler, trigger],
  );

  const onPointerLeave = useCallback(() => {
    (trigger.includes('hover') ? triggerHandler : doNothing)(false);
  }, [triggerHandler, trigger]);

  // keep tooltip stick to child
  useEffect(() => {
    if (openInternal) {
      // add event handler if missing
      // to
      const handler = () => {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const positionPerWindow = ref.current.getBoundingClientRect();

            setPosition(
              boundingToPosition(
                positionPerWindow,
                ref.current.clientHeight,
                ref.current.clientWidth,
              ),
            );
          }
        });
      };

      eventListenerRef.current = handler;
      window.addEventListener('scroll', eventListenerRef.current);
    } else {
      window.removeEventListener('scroll', eventListenerRef.current);
      eventListenerRef.current = null;
    }
  }, [openInternal]);

  if (!ready) {
    return children;
  }

  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </div>
      {ReactDOM.createPortal(
        <TooltipCard
          title={title}
          style={position}
          open={openInternal}
          onClick={onClick}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className={className}
        />,
        target,
      )}
    </>
  );
};

export default Tooltip;
