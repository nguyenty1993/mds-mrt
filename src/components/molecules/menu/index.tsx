import React, {
  useCallback,
  useState,
  MouseEvent,
  useEffect,
  useRef,
} from 'react';

import { styled } from '../../../styled';

import Dropdown from './components/dropdown';
import MenuItem from './components/menu-item';
import SubMenu from './components/sub-menu';
import { MenuItem as IMenuItem } from './types';

type MenuDirection = 'vertical' | 'horizontal';

const MenuDirections: any = {
  vertical: 'column',
  horizontal: 'row',
};

const MenuStyled = styled.nav<{ direction: MenuDirection }>`
  display: flex;
  flex-direction: ${(props) => MenuDirections[props.direction]};
  @media screen and (max-width: 1295px) and (min-width: 1024px) {
    .hide-menu-item {
      display: none;
    }
  }
`;

const MenuItemWithDropdownStyled = styled.div`
  position: relative;
  padding: 0 20px;
`;

const MenuMobileStyled = styled.div`
  position: relative;
  padding: 24px;
  flex-grow: 1;
`;

export const MenuDesktop = ({
  menu,
  className,
  activeIndex,
  onMenuItemClick,
}: {
  menu: IMenuItem[];
  className?: string;
  activeIndex: number;
  onMenuItemClick?: (item: IMenuItem, level: number, isMobile: boolean) => void;
}) => {
  const ref = useRef<number>(activeIndex);
  const [currentActiveIndex, setCurrentActiveIndex] =
    useState<number>(activeIndex);
  const [dropdownIndex, setDropdownIndex] = useState<number>(-1);

  const onCloseDropdown = useCallback(() => {
    setDropdownIndex(-1);
  }, []);

  useEffect(() => {
    setCurrentActiveIndex(activeIndex);
    ref.current = activeIndex;
  }, [activeIndex]);

  return (
    <MenuStyled className={className} direction={'horizontal'}>
      {menu.map((item: IMenuItem, index: number) => {
        return (
          <MenuItemWithDropdownStyled
            className={index >= 4 ? 'hide-menu-item' : ''}
            key={index}
            onMouseEnter={(e: any) => {
              if (item.disabled) {
                return;
              }
              setCurrentActiveIndex(index);
              setDropdownIndex(index);
            }}
            onMouseLeave={(e: any) => {
              if (item.disabled) {
                return;
              }
              setCurrentActiveIndex(ref.current);
              setDropdownIndex(-1);
            }}
          >
            <MenuItem
              target={item.target}
              active={index === currentActiveIndex}
              href={item.link}
              disabled={item.disabled}
              badge={item.badge}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }

                // parent will override behavior
                if (typeof onMenuItemClick === 'function') {
                  e.preventDefault();
                  onMenuItemClick(item, 0, false);
                }

                // avoid send # to url
                if (item.link === '#') {
                  e.preventDefault();
                }
              }}
            >
              {item.name}
            </MenuItem>
            {index === dropdownIndex && (
              <Dropdown
                items={item.subMenu ?? []}
                onClose={onCloseDropdown}
                onMenuItemClick={onMenuItemClick}
              />
            )}
          </MenuItemWithDropdownStyled>
        );
      })}
    </MenuStyled>
  );
};

export const MenuMobile = ({
  menu,
  className,
  onClose = () => undefined,
  activeIndex,
  onMenuItemClick = () => undefined,
}: {
  menu: IMenuItem[];
  className?: string;
  onClose?: () => void;
  activeIndex: number;
  onMenuItemClick?: (item: IMenuItem, level: number, isMobile: boolean) => void;
}) => {
  const [currentActiveIndex, setCurrentActiveIndex] =
    useState<number>(activeIndex);
  const [subMenuIndex, setSubmenuIndex] = useState<number>(-1);

  useEffect(() => {
    setCurrentActiveIndex(activeIndex);
  }, [activeIndex]);

  return (
    <MenuMobileStyled>
      <MenuStyled className={className} direction={'vertical'}>
        {menu.map((item: IMenuItem, index: number) => {
          return (
            <MenuItem
              target={item.target}
              key={index}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }

                if (typeof onMenuItemClick === 'function') {
                  e.preventDefault();
                  onMenuItemClick(item, 0, true);
                }

                // these behavior is default for mobile (always execute)
                // onMobile check children to decide behavior
                // length > 0: handle active index and submenu
                // length === 0: redirect
                if ((item.subMenu ?? []).length > 0) {
                  e.preventDefault();

                  setCurrentActiveIndex(index);
                  setSubmenuIndex(index);
                } else {
                  onClose();
                }
              }}
              href={item.link}
              withIcon={(item.subMenu ?? []).length > 0}
              variant={'rounded'}
              style={{ marginBottom: 8 }}
              active={index === currentActiveIndex}
              disabled={item.disabled}
              badge={item.badge}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </MenuStyled>

      {subMenuIndex !== -1 && (
        <SubMenu
          items={menu[currentActiveIndex]?.subMenu ?? []}
          onClose={onClose}
          onBack={() => setCurrentActiveIndex(-1)}
          initialActiveIndex={-1}
          onMenuItemClick={onMenuItemClick}
        />
      )}
    </MenuMobileStyled>
  );
};

export default {
  MenuItem,
  MenuMobile,
  MenuDesktop,
};
