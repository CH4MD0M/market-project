import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const HeadingVariants = cva(
  `
  font-bold smooth duration-300 transition-all
`,
  {
    variants: {
      variant: {
        default: 'text-[#282a2e]',
        primary: 'text-[#4565cc]',
        warn: 'text-[#d13c32]',
      },
      size: {
        default: 'text-md',
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof HeadingVariants> {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, size, variant, className, ...attributes }: HeadingProps) => {
  return (
    <h1 className={cn(HeadingVariants({ size, variant }), className)} {...attributes}>
      {children}
    </h1>
  );
};

export default Heading;
