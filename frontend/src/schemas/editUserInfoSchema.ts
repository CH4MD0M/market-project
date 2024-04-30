import { z } from 'zod';

export const editUserInfoSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  email: z.string().email({ message: '이메일 형식을 확인해주세요' }),
  isAdmin: z.boolean(),
});

export type EditUserInfoSchemaType = z.infer<typeof editUserInfoSchema>;
