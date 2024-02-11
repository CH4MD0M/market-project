import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { clsx } from 'clsx';

interface HoverCardProps {
  logo: React.ReactNode;
  title: string;
  description: string;
  direction: 'top' | 'bottom' | 'left' | 'right';
}

const HoverCard = ({ logo, title, description, direction }: HoverCardProps) => {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <div
          className={clsx(
            'inline-flex h-12 w-12 items-center justify-center rounded-full p-2.5 transition-all duration-200 smooth hover:bg-blue-50 cursor-pointer',
          )}
        >
          {logo}
        </div>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        align="center"
        sideOffset={4}
        side={direction}
        className={clsx(
          ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'max-w-md rounded-lg p-4 tablet:w-full',
          'bg-white',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 shadow-xl z-50',
        )}
      >
        <HoverCardPrimitive.Arrow className="fill-current text-white" />

        <div className="flex h-full w-full space-x-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>

            <p className="mt-1 text-sm font-normal text-gray-700">{description}</p>
          </div>
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export default HoverCard;
