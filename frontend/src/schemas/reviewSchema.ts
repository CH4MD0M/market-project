import { z } from 'zod';

export const reviewSchema = z
  .object({
    comment: z.string().min(1, { message: '리뷰를 입력해주세요' }),
    rating: z.preprocess(
      val => {
        return val === '' ? null : Number(val);
      },
      z.number().min(1, { message: '별점을 선택해주세요' }),
    ),
  })
  .required();

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
