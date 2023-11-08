import React from 'react';

import Container from '../atoms/container';
import Link from '../atoms/link';
import Typography from '../atoms/typography';
import Grid from '../atoms/grid';
import Divider from '../atoms/divider';

import { styled } from '../../styled';
import { breakpointCssFactory } from '../../utils';

const CurvedTop = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
  height: 84px;
  &::before {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    width: 150%;
    height: 1000px;
    background-color: #f0f7ff;
    border-radius: 2150px 2150px 0px 0px / 900px 900px 0px 0px;
    content: '';
    transform: translateX(-50%);

    ${breakpointCssFactory(
      'lg',
      `border-radius: 2150px 2150px 0px 0px / 500px 500px 0px 0px;`,
    )}
  }
`;

const FooterStyled = styled.footer`
  padding-bottom: 80px;
  color: #424242;
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: #f0f7ff;
`;

const ImgLogoStyled = styled.div`
  @media (min-width: 1024px) {
    width: 154px;
  }
  width: 118px;
  margin-bottom: 24px;
`;

const SectionStyled2 = styled.section`
  margin-top: 24px;
  display: flex;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
  row-gap: 16px;
  flex-direction: column;
`;

const StyledSocialIcon = styled.div`
  margin-left: 16px;
  width: 24px;
  float: right;
  ${breakpointCssFactory('lg', 'margin-left: 24px;')}
`;
const StyledSocialIcons = styled.div`
  display: flex;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <CurvedTop />
      <Container>
        <Grid col={{ sm: 1, md: 12 }}>
          <Grid.Col span={3} style={{ marginBottom: 24 }}>
            <Link href={'/'}>
              <ImgLogoStyled>
                <img
                  src='https://marathon.edu.vn/images/logo-3.png'
                  alt='logo-marathon'
                />
              </ImgLogoStyled>
            </Link>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              Khi có thắc mắc hoặc khiếu nại
              <br />
              về chất lượng dịch vụ, vui lòng liên hệ:
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <b>Hotline:</b> (028) 7300 3033
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <b>Email:</b>{' '}
              <a
                href='mailto:learnwithus@marathon.edu.vn'
                style={{ color: '#424242' }}
              >
                learnwithus@marathon.edu.vn
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              Công ty TNHH Marathon Education
              <br />
              Giấy CNĐKDN số: 0316952502,
              <br />
              ngày cấp 18/8/2021 bởi Sở Kế hoạch
              <br />
              và Đầu tư Thành Phố Hồ Chí Minh
            </Typography>
            <a
              href='http://online.gov.vn/Home/WebDetails/95295'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://marathon.edu.vn/images/sale-noti-logo.png'
                alt='logo-salenoti'
                style={{ width: 130, marginTop: 24 }}
              />
            </a>
            <a
              href='//www.dmca.com/Protection/Status.aspx?ID=1cd831b8-4938-46f0-bebb-20ef1f180bdb'
              title='DMCA.com Protection Status'
              className='dmca-badge'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=1cd831b8-4938-46f0-bebb-20ef1f180bdb'
                alt='DMCA.com Protection Status'
                style={{ width: 130, marginTop: 24, display: 'block' }}
              />
            </a>
          </Grid.Col>
          <Grid.Col span={3} style={{ marginBottom: 24 }}>
            <Typography
              type='p-3'
              weight='semibold'
              style={{ marginBottom: 24 }}
              color='#07375C'
              as='div'
            >
              Về Website
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/about'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Giới thiệu
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/event-phong-truyen-thong'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Phòng truyền thống
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/event-hoc-sinh-tieu-bieu'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học sinh tiêu biểu
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://blog.marathon.edu.vn'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Bản tin Marathon
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/event-tai-lieu-hoc-tap'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Tài liệu học tập
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/event-lien-he'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Liên hệ
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://www.facebook.com/career.marathon.edu.vn'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Tuyển dụng
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://partner.marathon.edu.vn/ctvweb'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Đăng ký CTV
              </a>
            </Typography>
          </Grid.Col>
          <Grid.Col span={3} style={{ marginBottom: 24 }}>
            <Typography
              type='p-3'
              weight='semibold'
              style={{ marginBottom: 24 }}
              color='#07375C'
              as='div'
            >
              {'Chính Sách & Hỗ Trợ'}
            </Typography>
            {/* <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/mrt-terms-and-conditions.pdf'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Quy chế hoạt động
              </a>
            </Typography> */}
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/regulations'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Chính sách & quy định chung
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/privacy'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Chính sách bảo mật
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/terms-and-conditions'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Điều khoản sử dụng
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/event-cac-cau-hoi-thuong-gap'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Giải đáp thắc mắc
              </a>
            </Typography>
          </Grid.Col>
          <Grid.Col span={3} style={{ marginBottom: 24 }}>
            <Typography
              type='p-3'
              weight='semibold'
              style={{ marginBottom: 24 }}
              color='#07375C'
              as='div'
            >
              Chương Trình Học Tiêu Biểu
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/gia-su-online'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Gia sư trực tuyến
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-toan-hoc-9'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học toán online lớp 9
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-toan-hoc-8'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học toán online lớp 8
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-toan-hoc-7'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học toán online lớp 7
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-toan-hoc-6'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học toán online lớp 6
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-lop-6'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học online lớp 6
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-lop-7'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học online lớp 7
              </a>
            </Typography>
            <Typography type='p-4' as='div' style={{ marginBottom: 12 }}>
              <a
                href='https://marathon.edu.vn/hoc-online-lop-8'
                target='_blank'
                rel='noreferrer'
                style={{ color: '#424242' }}
              >
                Học online lớp 8
              </a>
            </Typography>
          </Grid.Col>
        </Grid>
        <Divider />
        <Typography type='p-4' style={{ marginTop: 24 }} as='div'>
          <b>Văn phòng đại diện:</b> Tầng 9, Tòa nhà Lim Tower 3, 29A Nguyễn
          Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
        </Typography>
        <Typography type='p-4' style={{ marginTop: 24 }} as='div'>
          <b>Trụ sở chính HCM:</b> Tầng 1 - 3, Tòa nhà Yoko Building, 677/6 Điện
          Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh
        </Typography>
        <Typography type='p-4' style={{ marginTop: 24 }} as='div'>
          <b>Trụ sở chính HN:</b> Tầng 5, Tòa nhà Vinapaco, 142 Phố Đội Cấn,
          Phường Đội Cấn, Quận Ba Đình, Hà Nội
        </Typography>

        <Divider />

        <SectionStyled2>
          <Typography type={'p-4'} color='#07375c'>
            © 2023 Marathon Education. Đã Đăng Ký Bản Quyền
          </Typography>
          <StyledSocialIcons>
            <a
              href='https://www.youtube.com/channel/UCYv9Hu648OYZaV7jnvouwQA'
              target='_blank'
              rel='noreferrer'
            >
              <StyledSocialIcon>
                <img
                  src='https://marathon.edu.vn/images/youtube.png'
                  alt='social-youtube'
                />
              </StyledSocialIcon>
            </a>
            <a
              href='https://zalo.me/3373115423892392686'
              target='_blank'
              rel='noreferrer'
            >
              <StyledSocialIcon>
                <img
                  src='https://marathon.edu.vn/images/social-2.png'
                  alt='social-zalo'
                />
              </StyledSocialIcon>
            </a>
            <a
              href='https://www.facebook.com/marathon.edu.vn'
              target='_blank'
              rel='noreferrer'
            >
              <StyledSocialIcon>
                <img
                  src='https://marathon.edu.vn/images/facebook.png'
                  alt='social-facebook-fanpage'
                />
              </StyledSocialIcon>
            </a>
            <a
              href='https://www.tiktok.com/@marathon.edu.vn'
              target='_blank'
              rel='noreferrer'
            >
              <StyledSocialIcon>
                <img
                  src='https://marathon.edu.vn/images/tiktok.png'
                  alt='social-tiktok'
                />
              </StyledSocialIcon>
            </a>
            <a
              href='https://www.facebook.com/groups/404359241474723/'
              target='_blank'
              rel='noreferrer'
            >
              <StyledSocialIcon>
                <img
                  src='https://marathon.edu.vn/images/group.png'
                  alt='social-facebook-group'
                />
              </StyledSocialIcon>
            </a>
          </StyledSocialIcons>
        </SectionStyled2>
      </Container>
    </FooterStyled>
  );
};

export default Footer;
