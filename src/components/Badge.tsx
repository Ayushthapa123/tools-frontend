import { cn } from 'src/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
