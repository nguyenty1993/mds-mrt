import React, { ReactElement } from 'react';

import Container from '../atoms/container';
import Link from '../atoms/link';
import Button from '../atoms/button';
import Typography from '../atoms/typography';

import CurriculumCard from '../molecules/curriculum-card';

import { theme, respondTo } from '../../utils';
import { styled } from '../../styled';

const SectionStyled = styled.div`
  padding-top: 60px;
  background-color: #fafafa;
`;

const LinkStyled = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 60px;
`;
const CurriculumListStyle = styled.div`
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

const defaultId = 'curriculum-list';

const CurriculumList = ({
  title = defaultTitle,
  id = defaultId,
  isLoading,
  data,
  onShowMore,
}: {
  id: string;
  title?: string | ReactElement;
  isLoading: boolean;
  data: any[];
  onShowMore: () => void;
}) => {
  if (isLoading) {
    return null;
  }

  return (
    <SectionStyled>
      <Container id={id}>
        {title}
        <div>
          <CurriculumListStyle>
            {(data ?? []).map((curriculum: any, index: number) => (
              <div key={index}>
                <Link href={`/${curriculum.path || curriculum.slug}`}>
                  <CurriculumCard {...curriculum} />
                </Link>
              </div>
            ))}
          </CurriculumListStyle>
          <div>
            <LinkStyled>
              <Button
                buttonType='primary'
                buttonState='focus'
                onClick={onShowMore}
              >
                Xem thêm
              </Button>
            </LinkStyled>
          </div>
        </div>
      </Container>
    </SectionStyled>
  );
};

export default CurriculumList;
