export const MESSAGE = {
  REQUIRED: 'Vui lòng không để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  PHONE_INVALID: 'Số điện thoại không hợp lệ',
  ERROR: 'Lỗi hệ thống, vui lòng thử lại sau!',
  UPDATE_SUCCESS: 'Cập nhật thành công!',
  FILE_INVALID: 'Tệp không hợp lệ, không thể tải lên',
  SAVE_SUCCESS: 'Lưu thành công!',
};

export type Programs = 'moet' | 'ielts' | 'toan_tu_duy' | 'programming';

export const PROGRAM: { [key in Programs]: string } = {
  moet: 'Bộ giáo dục',
  ielts: 'Cambridge - Macmillan',
  toan_tu_duy: 'Toán tư duy',
  programming: 'Programming',
};

export const GRADES = [
  {
    grade: 6,
    bg: '#FCF1EB',
    border: '#F9BA98',
  },
  {
    grade: 7,
    bg: '#E4F4FB',
    border: '#98DCF9',
  },
  {
    grade: 8,
    bg: '#FEF9EC',
    border: '#F9DD98',
  },
  {
    grade: 9,
    bg: '#FCF1EB',
    border: '#F9BA98',
  },
  {
    grade: 10,
    bg: '#E4F4FB',
    border: '#98DCF9',
  },
  {
    grade: 11,
    bg: '#FEF9EC',
    border: '#F9DD98',
  },
  {
    grade: 12,
    bg: '#FCF1EB',
    border: '#F9BA98',
  },
];
