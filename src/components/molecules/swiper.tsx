import React, { HTMLAttributes, ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Typography from '../atoms/typography';
import Container from '../atoms/container';
import { styled } from '../../styled';
import { theme } from '../../utils';
import ChevronLeft from '../icons/chevron-left.svg';
import ChevronRight from '../icons/chevron-right.svg';

const IconSlickStyled = styled.div`
  box-shadow: 0px 10px 60px rgba(38, 45, 118, 0.15);
  border-radius: 20px;
  width: 64px;
  height: 56px;
  padding: 20px 24px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #07385c;
    path {
      stroke: white;
    }
  }
  path {
    stroke: #07385c;
  }
`;

const SwiperPrev = ({ onClick, className }: HTMLAttributes<HTMLDivElement>) => (
  <IconSlickStyled onClick={onClick} className={className}>
    <ChevronLeft />
  </IconSlickStyled>
);

const SwiperNext = ({ onClick, className }: HTMLAttributes<HTMLDivElement>) => (
  <IconSlickStyled onClick={onClick} className={className}>
    <ChevronRight />
  </IconSlickStyled>
);

const SectionStyled = styled.div`
  padding-top: 60px;
`;

const defaultTitle = (
  <Typography
    type={{ sm: 'p-1', md: 'h-6', lg: 'h-1' }}
    color={theme.colors['secondary-900']}
    weight='semibold'
  >
    Khóa Học{' '}
    <Typography
      type={{ sm: 'p-1', md: 'h-6', lg: 'h-1' }}
      color={theme.colors['primary']}
      as='span'
    >
      Liên Quan
    </Typography>
  </Typography>
);

const defaultId = 'curriculum-swiper';

interface SwiperBlockProps<DataType> {
  source: DataType[];
  renderItem: (item: DataType, index: number) => ReactElement;
  blockTitle: ReactElement;
}

function SwiperBlock({
  source = [],
  renderItem,
  blockTitle = defaultTitle,
  className = '',
  id = defaultId,
}: SwiperBlockProps<any> & HTMLAttributes<HTMLDivElement>) {
  if (source.length === 0) {
    return null;
  }

  console.log('SwiperBlock component', { source, renderItem, blockTitle });

  return (
    <SectionStyled className={className}>
      <Container id={id}>
        <div className='flex justify-between mb-10'>
          <div className='lg:text-left text-center w-full lg:text-[20px] text-[16px] text-[#9B9B9B]'>
            {blockTitle}
          </div>

          <div className='hidden lg:flex gap-[24px]'>
            <SwiperPrev
              onClick={() => {
                console.log('prev');
              }}
            />
            <SwiperNext
              onClick={() => {
                console.log('next');
              }}
            />
          </div>
        </div>
        <Swiper>
          {(source ?? []).map((item: any, index: number) => (
            <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </SectionStyled>
  );
}

export default SwiperBlock;
