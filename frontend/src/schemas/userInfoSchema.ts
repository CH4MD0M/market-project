import { z } from 'zod';
import { phoneRegex } from '@utils/validation';
import { passwordRegex } from '@utils/validation';

const userNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요' })
    .regex(/^[가-힣]{2,}$/, {
      message: '한글 이름을 입력해주세요',
    }),
});

const userPhoneSchema = z.object({
  phoneNumber: z.string().min(1, { message: '휴대폰 번호를 입력해주세요' }).regex(phoneRegex, {
    message: '휴대폰 번호 형식을 확인해주세요',
  }),
});

const userPasswordSchema = z
  .object({
    password: z.string().min(1, { message: '비밀번호를 입력해주세요' }).regex(passwordRegex, {
      message: '비밀번호는 영문,숫자,특수문자를 포함한 8자리 이상이어야 합니다',
    }),
    passwordCheck: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordCheck'],
      });
    }
  });

export { userNameSchema, userPhoneSchema, userPasswordSchema };

export type UserNameSchemaType = z.infer<typeof userNameSchema>;
export type UserPhoneSchemaType = z.infer<typeof userPhoneSchema>;
export type UserPasswordSchemaType = z.infer<typeof userPasswordSchema>;
