import React, { useEffect, useState, MouseEvent } from 'react';

import MenuItem from './menu-item';
import { styled } from '../../../../styled';
import { MenuItem as IMenuItem } from '../types';

type Variant = 'full' | 'minimal';

// for desktop
const DropdownWrapperStyled = styled.div<{
  variant: Variant;
}>`
  position: absolute;
  left: -40px;
  padding-top: 30px;

  width: ${(props) => dropdownSize[props.variant]};
  min-height: 260px;
  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(7, 56, 92, 0.08);
  border-radius: 8px;
  padding: 24px 24px;

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
  }
`;

const dropdownSize: any = {
  full: '846px',
  minimal: '298px',
};
// for desktop
const DropdownContainerStyled = styled.div<{
  variant: Variant;
}>`
  display: ${(props) => {
    if (props.variant === 'full') {
      return 'grid';
    }

    return 'block';
  }};

  grid-template-columns: ${(props) => {
    if (props.variant === 'full') {
      return 'repeat(3, minmax(0, 1fr))';
    }

    return 'unset';
  }};

  gap: ${(props) => {
    if (props.variant === 'full') {
      return '24px';
    }

    return 'unset';
  }};

  > .dropdown-first {
    border-right: ${(props) => {
      if (props.variant === 'full') {
        return '1px solid #ECECEC';
      }

      return 'unset';
    }};
  }

  > .dropdown-col {
    grid-column: span 2 / span 2;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
  > .dropdown-col > div {
    grid-column: span 1 / span 1;
  }

  > .dropdown-col a {
    white-space: nowrap;
  }
`;

// Dropdown for web
const Dropdown = ({
  items = [],
  onClose = () => undefined,
  onMenuItemClick,
}: {
  items: IMenuItem[];
  onClose: () => void;
  onMenuItemClick?: (item: IMenuItem, level: number, isMobile: boolean) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const activeItem = items[activeIndex];

  const variant = items.some((item) => (item.subMenu ?? []).length > 0)
    ? 'full'
    : 'minimal';

  // when have first menu have sub item, active it
  useEffect(() => {
    if ((items[0]?.subMenu ?? []).length > 0) {
      setActiveIndex(0);
    }
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <DropdownWrapperStyled variant={variant}>
      <DropdownContainerStyled variant={variant}>
        <div className='dropdown-first'>
          {items.map((item: IMenuItem, index: number) => {
            return (
              <MenuItem
                key={index}
                variant={'highlight'}
                active={index === activeIndex}
                onMouseEnter={(e: any) => {
                  if (item.disabled) {
                    return;
                  }
                  setActiveIndex(index);
                }}
                onMouseLeave={(e: any) => {
                  if (item.disabled) {
                    return;
                  }
                  if ((item.subMenu ?? []).length > 0) {
                    // setActiveIndex(0);
                  } else {
                    setActiveIndex(-1);
                  }
                }}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  // parent will override behavior
                  if (typeof onMenuItemClick === 'function') {
                    e.preventDefault();
                    onMenuItemClick(item, 1, false);
                  }

                  // avoid send # to url
                  if (item.link === '#') {
                    e.preventDefault();
                  }
                }}
                href={item.link}
                withIcon={(item.subMenu ?? []).length > 0}
                style={{ paddingRight: 8 }}
                disabled={item.disabled}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </div>
        {activeItem && activeItem.subMenu && (
          <div className='dropdown-col'>
            {activeItem.subMenu.map((level2: IMenuItem, index: number) => (
              <div key={index}>
                <MenuItem
                  style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}
                  href={level2.link}
                  disabled={level2.disabled}
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    // parent will override behavior
                    if (typeof onMenuItemClick === 'function') {
                      e.preventDefault();
                      onMenuItemClick(level2, 2, false);
                    }

                    // avoid send # to url
                    if (level2.link === '#') {
                      e.preventDefault();
                    }
                  }}
                >
                  {level2.name}
                </MenuItem>
                {level2.subMenu && (
                  <div>
                    {level2.subMenu.map((level3: IMenuItem, _index: number) => (
                      <MenuItem
                        key={_index}
                        withHover
                        href={level3.link}
                        disabled={level3.disabled}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                          // parent will override behavior
                          if (typeof onMenuItemClick === 'function') {
                            e.preventDefault();
                            onMenuItemClick(level3, 3, false);
                          }

                          // avoid send # to url
                          if (level3.link === '#') {
                            e.preventDefault();
                          }
                        }}
                      >
                        {level3.name}
                      </MenuItem>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DropdownContainerStyled>
    </DropdownWrapperStyled>
  );
};

export default Dropdown;
