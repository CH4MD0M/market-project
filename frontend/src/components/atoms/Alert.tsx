import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import cn from '@utils/cn';

const AlertVariants = cva(`flex items-center rounded-lg p-4 mb-4`, {
  variants: {
    variant: {
      info: 'text-blue-800 bg-blue-50',
      success: 'text-green-800 bg-green-50',
      warning: 'text-red-800 bg-red-50',
    },
  },
});

interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof AlertVariants> {
  children: React.ReactNode;
}

const Alert = ({ variant, className, children, ...attributes }: AlertProps) => {
  return (
    <div className={cn(AlertVariants({ variant }), className)} {...attributes}>
      <InformationCircleIcon className="flex-shrink-0 w-5 h-5 text-inherit" />

      <div className="ms-3 text-sm font-medium">{children}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 text-inherit bg-inherit"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;
