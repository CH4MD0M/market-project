import { z } from 'zod';
import { passwordRegex } from '@utils/validation';

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '이름을 입력해주세요' })
      .regex(/^[가-힣]+$/, { message: '이름은 한글만 입력 가능합니다' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '유효하지 않은 이메일 양식입니다.' }),
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

export type SignupSchemaType = z.infer<typeof signupSchema>;
