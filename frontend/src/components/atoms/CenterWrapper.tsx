import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const CenterWrapperVariants = cva(`my-0 mx-auto`, {
  variants: {
    size: {
      default: 'max-w-full',
      sm: 'max-w-[560px]',
      md: 'max-w-[832px]',
      lg: 'max-w-[1156px]',
    },
    defaultVariants: {
      size: 'default',
    },
  },
});

interface CenterWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CenterWrapperVariants> {
  children: React.ReactNode;
}

const CenterWrapper = ({ size, children, className, ...attributes }: CenterWrapperProps) => {
  return (
    <section className={cn(CenterWrapperVariants({ size }), className)} {...attributes}>
      {children}
    </section>
  );
};

export default CenterWrapper;
