import { z } from 'zod';
import { passwordRegex } from '@utils/validation';

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '유효하지 않은 이메일 양식입니다.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요' }).regex(passwordRegex, {
      message: '비밀번호는 영문,숫자,특수문자를 포함한 8자리 이상이어야 합니다',
    }),
  })
  .required();

export type LoginSchemaType = z.infer<typeof loginSchema>;
