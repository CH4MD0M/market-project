import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

const ButtonVariants = cva(
  `
  flex justify-center items-center rounded-xl 
  disabled:pointer-events-none disabled:opacity-50
  text-base font-bold transition-all
  duration-200
  `,
  {
    variants: {
      variant: {
        default: 'text-[#282a2e] border-[1px]',
        pagination:
          'text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-800 hover:text-white',
        primary: 'bg-[#4565cc] text-white',
        warn: 'bg-[#d13c32] text-white',
      },
      size: {
        default: 'py-2 px-4',
        lg: 'py-3 px-6',
        full: ' flex items-center justify-center w-full py-2 px-3',
      },
      hovercolor: {
        default: 'hover:bg-[#4565cc]/30 hover:text-[#4565cc]',
        active: 'hover:bg-gradient-to-r hover:from-[#4568dc] hover:to-[#b06ab3] ',
      },
      activecolor: {
        default: '',
        active: ' active:hover:bg-blue-700 hover:opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hovercolor: 'active',
      activecolor: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
}

const Button = ({
  variant,
  size,
  hovercolor,
  activecolor,
  children,
  className,
  ...attributes
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, size, hovercolor, activecolor }), className)}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
