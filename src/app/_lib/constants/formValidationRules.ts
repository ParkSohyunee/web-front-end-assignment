/** 책 생성 form 유효성 검사 규칙 */
const titleInputRules = { required: '제목을 입력해주세요.' };

const authorInputRules = { required: '저자를 입력해주세요.' };

const descriptionInputRules = {
  required: '소개를 입력해주세요.',
  maxLength: { value: 30, message: '소개는 최대 30자까지 입력할 수 있어요.' },
};

const priceInputRules = {
  required: '가격을 입력해주세요.',
  min: { value: 0, message: '최소 0원 이상 입력' },
};

const stockInputRules = {
  required: '수량을 입력해주세요.',
  min: { value: 1, message: '최소 1개 이상 입력' },
};

export {
  titleInputRules,
  authorInputRules,
  descriptionInputRules,
  priceInputRules,
  stockInputRules,
};
