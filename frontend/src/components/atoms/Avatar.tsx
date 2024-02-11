import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import cn from '@utils/cn';

const AvatarVariants = cva(
  `border inline-flex h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle
hover:bg-blue-200 duration-300 cursor-pointer`,
  {
    variants: {
      size: {
        small: 'w-[24px] h-[24px] text-xs',
        medium: 'w-[32px] h-[32px]',
        large: 'w-[42px] h-[42px]',
        extraLarge: 'w-[56px] h-[56px] text-xl',
      },
    },
  },
);

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof AvatarVariants> {
  imgSrc?: string;
}

const Avatar = ({ imgSrc, size = 'medium', className, ...attributes }: AvatarProps) => {
  return (
    <div className={cn(AvatarVariants({ size }), className)} {...attributes}>
      {imgSrc ? (
        <img className="h-full w-full object-cover" src={imgSrc} alt="avatar" />
      ) : (
        <UserCircleIcon />
      )}
    </div>
  );
};

export default Avatar;
