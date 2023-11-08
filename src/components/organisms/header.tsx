import React, { cloneElement, useMemo, useState } from 'react';

import findLastIndex from 'lodash/findLastIndex';
import findIndex from 'lodash/findIndex';

import Link from '../atoms/link';
import Button from '../atoms/button';

import Drawer from '../molecules/drawer';
import { MenuDesktop, MenuMobile } from '../molecules/menu/index';
import { MenuItem } from '../molecules/menu/types';

import HamburgerSvg from '../../icons/hamburger.svg';
import { styled } from '../../styled';
import { breakpointCssFactory, respondTo } from '../../utils';

const SimpleLoginButton = () => {
  return (
    <Button
      buttonType='primary'
      onClick={async () => {
        window.location.href = 'https://marathon.edu.vn/dang-nhap';
      }}
    >
      Đăng nhập
    </Button>
  );
};

const HeaderContainerStyled = styled.div`
  height: 56px;
  ${breakpointCssFactory(
    'lg',
    `
    height: 64px;
    `,
  )}
`;

// for all header
const HeaderStyled = styled.div`
  height: 56px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 11;
  background-color: white;
  padding-left: 0;
  padding-right: 0;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 0.1);
  ${breakpointCssFactory(
    'lg',
    `
    height: 64px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    `,
  )}
`;

//for header desktop
const HeaderDesktopStyled = styled.div`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  > a {
    margin-right: 32px;
  }

  display: none;
  ${respondTo.lg`
    display: flex;
  `}
`;
const LogoStyled = styled.img`
  width: 140px;
`;
const DesktopRightActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 auto;
  text-align: justify;
`;

//for header mobile
const HeaderMobileStyled = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 56px;
  ${respondTo.lg`
    display: none;
  `};
`;
const HamburgerStyled = styled.div`
  width: 56px;
  height: 56px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const MobileRightActionsStyled = styled.div`
  padding-right: 8px;
  padding-top: 8px;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
`;

/* Sidebar menu on mobile */
const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
`;

const BottomActionsStyled = styled.div`
  padding: 24px;
`;

function isMenuActiveFactory(currentUrl: string) {
  function isMenuActive(menuItem: MenuItem): boolean {
    const currentDomain = new URL(currentUrl).host;
    const currentPath = new URL(currentUrl).pathname;
    if ((menuItem.link ?? '').startsWith(currentDomain)) {
      return true;
    } else {
      if (
        menuItem.link === currentPath ||
        currentPath.includes(menuItem.link)
      ) {
        return true;
      }
    }

    const subActiveIndex = findIndex(
      menuItem.subMenu ?? [],
      (nextSubItem: MenuItem) => isMenuActiveFactory(currentUrl)(nextSubItem),
    );

    return subActiveIndex > -1;
  }
  return isMenuActive;
}

const findInitActiveIndex = (menuAtLevel: MenuItem[], currentUrl: string) => {
  if (menuAtLevel.length < 0) {
    return -1;
  }
  if (!currentUrl) {
    return -1;
  }

  return findLastIndex(menuAtLevel, isMenuActiveFactory(currentUrl));
};

const Header = ({
  rightActionsDesktop,
  rightActionsMobile,
  bottomActions,
  logo,
  menu = [],
  menuClassname = '',
  currentUrl,
  withLoginButton = false,
  onMenuItemClick,
}: {
  rightActionsDesktop?: any;
  rightActionsMobile?: any;
  bottomActions?: any;
  logo?: {
    link?: string;
    image?: string;
  };
  menu?: MenuItem[];
  menuClassname?: string;
  currentUrl: string;
  withLoginButton?: boolean;
  onMenuItemClick?: (item: MenuItem, level: number, isMobile: boolean) => void;
}) => {
  const [openMenusDrawer, setOpenMenusDrawer] = useState(false);

  const activeMenuIndex = useMemo(() => {
    return findInitActiveIndex(menu, currentUrl);
  }, [menu, currentUrl]);

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        {/* HEADER mobile */}
        <HeaderMobileStyled>
          <Link href={logo.link}>
            <img
              src={logo.image}
              loading='eager'
              alt='logo'
              style={{ width: 82 }}
            />
          </Link>
          <HamburgerStyled onClick={() => setOpenMenusDrawer(!openMenusDrawer)}>
            <HamburgerSvg width={18} height={18} />
          </HamburgerStyled>

          <MobileRightActionsStyled>
            {withLoginButton && <SimpleLoginButton />}
            {!withLoginButton && rightActionsMobile}
          </MobileRightActionsStyled>
        </HeaderMobileStyled>
        {/* HEADER desktop */}
        <HeaderDesktopStyled>
          <Link href={logo.link}>
            <LogoStyled src={logo.image} loading='eager' alt='logo' />
          </Link>
          {menu.length > 0 && (
            <MenuDesktop
              menu={menu}
              activeIndex={activeMenuIndex}
              className={menuClassname}
              onMenuItemClick={onMenuItemClick}
            />
          )}
          <DesktopRightActionsStyled>
            {withLoginButton && <SimpleLoginButton />}
            {!withLoginButton && rightActionsDesktop}
          </DesktopRightActionsStyled>
        </HeaderDesktopStyled>
      </HeaderStyled>
      {/* Sidebar menu on mobile */}
      <Drawer
        position='left'
        open={openMenusDrawer}
        close={() => setOpenMenusDrawer(false)}
      >
        {openMenusDrawer && (
          <>
            <SidebarStyled>
              {menu.length > 0 && (
                <MenuMobile
                  menu={menu}
                  onClose={() => setOpenMenusDrawer(false)}
                  activeIndex={activeMenuIndex}
                  className={menuClassname}
                  onMenuItemClick={onMenuItemClick}
                />
              )}
              {bottomActions && (
                <BottomActionsStyled>
                  {cloneElement(bottomActions, {
                    closeDrawer: () => {
                      setOpenMenusDrawer(false);
                    },
                  })}
                </BottomActionsStyled>
              )}
            </SidebarStyled>
          </>
        )}
      </Drawer>
    </HeaderContainerStyled>
  );
};

export default Header;
