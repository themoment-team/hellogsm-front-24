export const memberQueryKeys = {
  postMember: () => ['member', 'register'],
} as const;

export const phoneNumberQueryKeys = {
  postPhoneNumber: () => ['number', 'post'],
} as const;

export const codeQueryKeys = {
  postCode: () => ['code', 'info'],
} as const;
