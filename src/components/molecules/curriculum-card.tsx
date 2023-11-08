import React, { useEffect, useState } from 'react';

import { styled } from '../../styled';
import { GRADES } from '../../utils/constans';
import { respondTo } from '../../utils';

export interface CardProps {
  title: string;
  grade: {
    id: number;
    name: string;
  };
  image: string;
  program: string;
  slug: string;
  schoolYear?: string;
  className?: string;
}

const GradeNameStyled = styled.div`
  margin-right: 8px;
  border-radius: 4px;
  color: #9b9b9b;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  padding: 4px 6px;
  line-height: 1;
  border: 1px solid;
  span {
    font-weight: 600;
    font-size: 16px;
    margin-top: 6px;
    display: block;
    color: #212121;
  }
`;

const CardStyled = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding-bottom: 14px;
  overflow: hidden;
  max-width: 283px;
  margin: auto;
  ${respondTo.lg`
    max-width: 283px;
    margin: auto;   
  `}
`;

const SideStyled = styled.div`
  position: relative;
`;
const HeaderSideStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  margin-top: 16px;
  margin-left: 8px;
  margin-right: 8px;
`;
const CurriNameStyled = styled.div`
  background: #e9f9f2;
  border-radius: 4px;
  padding: 4px 8px;
  color: #219b67;
  font-weight: 400;
  font-size: 12px;
  text-align: left;
  margin-right: 16px;
`;
const SchoolYearStyled = styled.p`
  font-size: 12px;
  margin-left: 8px;
  margin-top: 8px;
  height: 18px;
  text-align: left;
`;
const ArticleStyled = styled.article`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 16px;
  margin-right: 16px;
`;
const TitleClassStyled = styled.p`
  ${respondTo.lg`
        font-size: 16px;
        line-height: 24px;
        height: 48px;  
    `}
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #07385c;
`;

function Image({
  src,
  fallback,
  alt,
  ratio,
  className,
}: Partial<{
  src: string;
  fallback: string;
  alt: string;
  ratio?: number;
  className?: string;
}>) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  if (ratio) {
    return (
      <span
        style={{
          width: '100%',
          paddingTop: `${ratio * 100}%`,
          position: 'relative',
          display: 'block',
        }}
      >
        <img
          src={imgSrc}
          alt={alt}
          onError={() => {
            setImgSrc(fallback);
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className={className}
        />
      </span>
    );
  }
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
      className={className}
    />
  );
}

const GradeTag = ({
  grade,
  program,
  gradeStyles,
}: {
  grade: any;
  program: string;
  gradeStyles: any;
}) => {
  if (program === 'moet') {
    return (
      <GradeNameStyled
        style={{
          borderColor: gradeStyles?.border,
          backgroundColor: gradeStyles?.bg,
        }}
      >
        Lớp<span>{grade.id}</span>
      </GradeNameStyled>
    );
  }
  if (program === 'ielts') {
    return (
      <GradeNameStyled
        style={{
          borderColor: '#FFD8C2',
          backgroundColor: '#FCF1EB',
        }}
      >
        Bằng <span>{grade.name}</span>
      </GradeNameStyled>
    );
  }

  return null;
};

const CurriculumCard = ({
  title,
  grade,
  image,
  program,
  schoolYear,
  className,
}: CardProps) => {
  const gradeStyles = GRADES.find((item) => item.grade === grade.id);

  return (
    <CardStyled>
      <SideStyled>
        <Image
          src={image}
          alt={title}
          fallback='https://marathon.edu.vn/images/marathon-default.png'
          ratio={0.67}
        />
        <HeaderSideStyled>
          <div>
            <CurriNameStyled>{program}</CurriNameStyled>
            <SchoolYearStyled>{schoolYear || null}</SchoolYearStyled>
          </div>
          <GradeTag grade={grade} program={program} gradeStyles={gradeStyles} />
        </HeaderSideStyled>
      </SideStyled>
      <ArticleStyled>
        <TitleClassStyled title={title}>{title}</TitleClassStyled>
      </ArticleStyled>
    </CardStyled>
  );
};

export default CurriculumCard;
