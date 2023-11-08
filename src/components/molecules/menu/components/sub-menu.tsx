import React, { useCallback, useState, MouseEvent } from 'react';

import Button from '../../../atoms/button';
import BackMenuSvg from '../../../../icons/back-menu.svg';
import { styled } from '../../../../styled';

import { MenuItem as IMenuItem } from '../types';
import MenuItem from './menu-item';

const SubMenuStyled = styled.div`
  background: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const BackButtonStyled = styled.div`
  padding: 8px;
  margin-bottom: 16;
  border-bottom: 1px solid #ececec;
`;

const SubMenuWrapper = styled.div`
  padding: 0 16px;
  margin-top: 8px;
`;

// Sub menu for wap
const SubMenu = ({
  items = [],
  onClose = () => undefined,
  onBack = () => undefined,
  initialActiveIndex,
  onMenuItemClick,
}: {
  items: IMenuItem[];
  onClose: () => void;
  onBack: () => void;
  initialActiveIndex: number;
  onMenuItemClick?: (item: IMenuItem, level: number, isMobile: boolean) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const onClickBack = useCallback((e: any) => {
    e.stopPropagation();
    onBack();
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <SubMenuStyled>
      <BackButtonStyled>
        <Button
          leftIcon={
            <BackMenuSvg style={{ marginRight: 16 }} width={24} height={24} />
          }
          buttonType='primary'
          buttonState='focus'
          onClick={onClickBack}
        >
          Quay lại
        </Button>
      </BackButtonStyled>
      {items.map((item: IMenuItem, index: number) => {
        return (
          <SubMenuWrapper key={index}>
            <MenuItem
              key={index}
              active={index === activeIndex}
              variant={'highlight'}
              href={item.link}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }

                if (typeof onMenuItemClick === 'function') {
                  e.preventDefault();
                  onMenuItemClick(item, 1, true);
                }

                // these behavior is default for mobile (always execute)
                // onMobile check children to decide behavior
                // length > 0: handle active index and submenu
                // length === 0: redirect
                if ((item.subMenu ?? []).length > 0) {
                  e.preventDefault();
                  if (index === activeIndex) {
                    setActiveIndex(-1);
                  } else {
                    setActiveIndex(index);
                  }
                } else {
                  onClose();
                }
              }}
              withIcon={(item.subMenu ?? []).length > 0}
              disabled={item.disabled}
            >
              {item.name}
            </MenuItem>
            {index === activeIndex && (item.subMenu ?? []).length > 0 && (
              <div>
                {(item.subMenu ?? []).map(
                  (level2: IMenuItem, _index: number) => (
                    <div key={_index}>
                      <MenuItem
                        style={{ fontWeight: 600 }}
                        href={level2.link}
                        disabled={level2.disabled}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                          if (level2.disabled) {
                            e.preventDefault();
                            return;
                          }

                          if (typeof onMenuItemClick === 'function') {
                            e.preventDefault();
                            onMenuItemClick(level2, 2, true);
                          }

                          onClose();
                        }}
                      >
                        {level2.name}
                      </MenuItem>
                      {(level2.subMenu ?? []).map(
                        (level3: IMenuItem, __index: number) => (
                          <MenuItem
                            key={__index}
                            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                              if (level3.disabled) {
                                e.preventDefault();
                                return;
                              }

                              if (typeof onMenuItemClick === 'function') {
                                e.preventDefault();
                                onMenuItemClick(level3, 3, true);
                              }

                              onClose();
                            }}
                            href={level3.link}
                            disabled={level3.disabled}
                          >
                            {level3.name}
                          </MenuItem>
                        ),
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
          </SubMenuWrapper>
        );
      })}
    </SubMenuStyled>
  );
};

export default SubMenu;
