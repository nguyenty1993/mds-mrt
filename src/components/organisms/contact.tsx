import React, { useState, ReactElement, useCallback, UIEvent } from 'react';

import { styled } from '../../styled';

import Container from '../atoms/container';
import Input from '../atoms/input';
import Button from '../atoms/button';
import scrollToId from '../../utils/scrollToId';
import Select from '../atoms/select';
import { theme, breakpointCssFactory, getTheme } from '../../utils';
import Grid from '../atoms/grid';
import Typography from '../atoms/typography';

const defaultOptions = [
  'Học thêm từ lớp 3-5',
  'Học thêm từ lớp 6-9',
  'Học thêm từ lớp 10-12',
  'Luyện thi vào lớp 10 cấp tốc',
  'Luyện thi THPT & Đại học cấp tốc',
  'Khóa học IELTS',
  'Khóa học tiếng anh cho trẻ em',
  'Luyện thi đánh giá năng lực cấp tốc',
  'Gia sư 1 kèm 1',
  'Khóa học lập trình',
  'Khóa học tin học văn phòng',
];

const ContainerStyled = styled.div`
  margin: 40px 0;
  ${breakpointCssFactory('lg', 'margin-top: 40px;')}
`;

const IntroImageStyled = styled.img`
  display: none;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  height: auto;

  ${breakpointCssFactory('lg', `display: block;`)}
`;

const FormStyled = styled.form`
  margin-top: 16px;
`;

const CTAStyled = styled(Button)`
  margin-top: 24px;
  margin: auto;
  min-width: 128px;
  display: flex;
`;

const PartnerCtaStyled = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 16px;
  line-height: 125%;
  color: ${(props) => getTheme(props.theme).colors['neutral-800']};
  > a {
    color: ${(props) => getTheme(props.theme).colors['primary']};
  }
  > a:hover {
    text-decoration-line: underline;
  }
`;

const FloatingBtnStyled = styled.div`
  display: block;
  cursor: pointer;
  position: fixed;
  z-index: 9999;

  right: 12px;
  bottom: 12px;
  width: 104px;

  ${breakpointCssFactory(
    'lg',
    `
    right: 24px;
    bottom: 24px;
    width: 155px;
    `,
  )}
`;

interface ContactFormProps {
  title?: string | ReactElement;
  id?: string;
  note?: string;
  program?: string;
  inline?: boolean;
  withAnchor?: boolean;
  anchorImage?: string;
  subjectOptions?: string[];
  handlePostData: (data: any) => Promise<void>;
  isPostingData: boolean;
}

const defaultTitle = (
  <Typography
    type={{ sm: 'h-6', md: 'h-2' }}
    color={theme.colors['secondary-900']}
    weight='semibold'
  >
    Đăng Ký&nbsp;<span className='text-[#219B67]'>Học Thử</span>
  </Typography>
);

const defaultId = 'contact-form-section';

const validateForm = (values: any) => {
  const errors = {
    first_name: '',
    phone: '',
    email: '',
    subject: '',
  };

  const regexPhone =
    /^((\\+[0]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const regexEmail = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;

  if (!values.first_name) {
    errors['first_name'] = 'Thông tin không được để trống';
  }

  if (!values.phone) {
    errors['phone'] = 'Thông tin không được để trống';
  } else if (!regexPhone.test(values.phone)) {
    errors['phone'] = 'Số điện thoại không hợp lệ';
  } else if (values.phone.length < 10) {
    errors['phone'] = 'Số điện thoại không hợp lệ';
  } else if (values.phone.length > 10) {
    errors['phone'] = 'Số điện thoại không hợp lệ';
  }

  if (!values.email) {
    values.email;
  } else if (!regexEmail.test(values.email)) {
    errors['email'] = 'Email không hợp lệ';
  }

  if (values.subject === '') {
    errors['subject'] = 'Thông tin không được để trống';
  }

  return errors;
};

const defaultState = {
  first_name: '',
  phone: '',
  email: '',
  subject: '',
};

const ContactForm = ({
  title = defaultTitle,
  id = defaultId,
  note = '',
  inline = false,
  withAnchor = true,
  anchorImage = 'https://marathon.edu.vn/images/trial-study-floating-btn.png',
  subjectOptions = defaultOptions,
  handlePostData,
  isPostingData,
}: ContactFormProps) => {
  const [formErrors, setFormError] = useState({
    first_name: '',
    phone: '',
    email: '',
    subject: '',
  });

  const [formData, setFormData] = useState(defaultState);

  const onChangeHandler = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSubmit = useCallback(async () => {
    const formError = validateForm(formData);
    setFormError(formError);

    if (
      formError['first_name'] !== '' ||
      formError['phone'] !== '' ||
      formError['email'] !== '' ||
      formError['subject'] !== ''
    ) {
      return;
    }

    await handlePostData({
      first_name: formData.first_name,
      phone: formData.phone,
      email: formData.email,
      interest_on_subjects: formData.subject,
      note: note,
    });

    setFormData(defaultState);
  }, [formData, handlePostData, note]);

  const onClickAnchor = useCallback(() => {
    scrollToId(id, -80);
  }, [id]);

  return (
    <Container id={id}>
      <ContainerStyled>
        <Grid col={inline ? 1 : { sm: 1, lg: 2 }} gutter={24}>
          {!inline && (
            <IntroImageStyled
              src='https://cdn.marathon.edu.vn/uploads/SDpxrxgfVhsQQFQR4TH5opCO0XeF5QInsAQrnSBW.png'
              alt='contact-me'
            />
          )}
          <div>
            {title}
            <FormStyled
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Input
                required
                label='Họ tên'
                type='text'
                name={'first_name'}
                value={formData.first_name}
                onChange={onChangeHandler}
                onBlur={() => {
                  setFormError({
                    ...formErrors,
                    first_name: validateForm(formData).first_name,
                  });
                }}
                message={formErrors['first_name']}
                inputState={formErrors['first_name'] ? 'error' : 'default'}
              />
              <Input
                required
                label='Số điện thoại'
                type='tel'
                name={'phone'}
                value={formData.phone}
                onChange={onChangeHandler}
                onBlur={() => {
                  setFormError({
                    ...formErrors,
                    phone: validateForm(formData).phone,
                  });
                }}
                message={formErrors['phone']}
                inputState={formErrors['phone'] ? 'error' : 'default'}
              />
              <Input
                required
                label='Địa chỉ email'
                type='email'
                name={'email'}
                value={formData.email}
                onChange={onChangeHandler}
                onBlur={() => {
                  setFormError({
                    ...formErrors,
                    email: validateForm(formData).email,
                  });
                }}
                message={formErrors['email']}
                inputState={formErrors['email'] ? 'error' : 'default'}
              />

              <Select
                name={'subject'}
                value={formData.subject}
                onChange={(e: UIEvent<HTMLSelectElement>) => {
                  setFormData({
                    ...formData,
                    // @ts-expect-error
                    subject: e.target.value,
                  });
                }}
                options={subjectOptions.map((opt) => ({
                  value: opt,
                  label: opt,
                }))}
                label='Môn học quan tâm?'
                placeholder='Chọn môn học'
                onBlur={() => {
                  setFormError({
                    ...formErrors,
                    subject: validateForm(formData).subject,
                  });
                }}
                message={formErrors['subject']}
                state={formErrors['subject'] ? 'error' : 'default'}
              />

              <CTAStyled buttonType='primary' disabled={isPostingData}>
                Gửi
              </CTAStyled>
            </FormStyled>
          </div>
        </Grid>
      </ContainerStyled>
      {withAnchor && (
        <FloatingBtnStyled onClick={onClickAnchor}>
          <img src={anchorImage} alt='contact-me' width={'100%'} />
        </FloatingBtnStyled>
      )}
    </Container>
  );
};

export default ContactForm;
