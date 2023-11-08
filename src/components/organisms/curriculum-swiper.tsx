import React, { ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Container from '../atoms/container';
import Link from '../atoms/link';
import Typography from '../atoms/typography';

import CurriculumCard from '../molecules/curriculum-card';

import { styled } from '../../styled';
import { respondTo, theme } from '../../utils';

import 'swiper/css';

const SectionStyled = styled.div`
  padding-top: 60px;
  background-color: #fafafa;
`;
const CurriculumListStyled = styled.div`
  display: grid;
  gap: 24px;
  padding-bottom: 30px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  ${respondTo.lg`
    grid-template-columns: repeat(5, minmax(0, 1fr)); 
    gap: 16px;
  `}
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

const CurriculumSwiper = ({
  title = defaultTitle,
  id = defaultId,
  isLoading,
  data,
}: {
  id: string;
  title?: string | ReactElement;
  isLoading: boolean;
  data: any[];
}) => {
  if (isLoading) {
    return null;
  }

  return (
    <SectionStyled>
      <Container id={id}>
        <div>
          {title}
          <div>
            <CurriculumListStyled>
              <Swiper>
                {(data ?? []).map((curriculum: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Link href={`/${curriculum.path || curriculum.slug}`}>
                      <CurriculumCard {...curriculum} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </CurriculumListStyled>
          </div>
        </div>
      </Container>
    </SectionStyled>
  );
};

export default CurriculumSwiper;
