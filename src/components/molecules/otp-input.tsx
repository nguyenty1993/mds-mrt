import React, {
  ChangeEvent,
  KeyboardEvent,
  StyleHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import times from 'lodash/times';

import Input from '../atoms/input';
import { styled } from '../../styled';
import { getTheme } from '../../utils';

interface OtpInputProps {
  length?: number;
  className?: string;
  style?: StyleHTMLAttributes<HTMLDivElement>;
  onChange: (otp: string) => void;
  value: string;
}

const OtpInputStyled = styled.div`
  display: grid;
  gap: 8px 8px;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  input {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    height: 56px;
    width: 100%;
    max-width: 48px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid
      ${(props) => getTheme(props.theme).colors['neutral-300']};
  }

  input:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid
      ${(props) => getTheme(props.theme).colors['neutral-300']};
  }
`;

const regexOtp = /[0-9]{4,8}/;

function OtpInput({
  length = 6,
  className,
  style,
  onChange,
  value,
}: OtpInputProps) {
  const [otp, setOtp] = useState(times(length, () => ''));

  useEffect(() => {
    if (value === '') {
      setOtp(times(length, () => ''));
    } else {
      setOtp(value.split(''));
    }
  }, [value]);

  const onChangeIndex =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      // check valid value
      let nextValue = e.target.value;

      if (index === 0 && regexOtp.test(nextValue)) {
        onChange(nextValue);
        return;
      }

      if (!/[0-9]{1}/.test(nextValue)) {
        nextValue = '';
      }

      const newOtp = otp;
      newOtp[index] = nextValue;
      const fullString = newOtp.join('');
      onChange(fullString);

      if (nextValue !== '') {
        if (index < length - 1) {
          // focus to next input
          document.getElementById(`otp_${index + 1}`).focus();
        }
      }

      if (index === length - 1) {
        // check is valid otp
        if (regexOtp.test(fullString)) {
          e.target.blur();
        }
      }
    };

  const onKeydownIndex = useCallback(
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault(); // to not trigger on change
        const newOtp = otp;
        newOtp[index] = '';
        onChange(newOtp.join(''));
        (document.getElementById(`otp_${index}`) as HTMLInputElement).value =
          '';
        setTimeout(() => {
          if (index > 0) {
            document.getElementById(`otp_${index - 1}`).focus();
            (
              document.getElementById(`otp_${index - 1}`) as HTMLInputElement
            ).select();
          }
        }, 50);
      }
    },
    [otp],
  );

  useEffect(() => {
    // focus to first input
    document.getElementById('otp_0').focus();
  }, []);

  return (
    <OtpInputStyled className={className} style={style}>
      {times(length, (index) => {
        return (
          <Input
            key={index}
            name={`otp_${index}`}
            id={`otp_${index}`}
            onChange={onChangeIndex(index)}
            onKeyDown={onKeydownIndex(index)}
            inputSize={'xl'}
            min={0}
            max={9}
            value={otp[index]}
            type='text'
            pattern='\d*'
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            autoFocus={index === 0 ? true : false}
          />
        );
      })}
    </OtpInputStyled>
  );
}

export default OtpInput;
