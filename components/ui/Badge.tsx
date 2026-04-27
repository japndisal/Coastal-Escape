import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'coral' | 'seagreen' | 'ghostblue' | 'stone';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-ghostblue text-ocean',
    coral: 'bg-coral/10 text-coral',
    seagreen: 'bg-seagreen/10 text-seagreen',
    ghostblue: 'bg-ghostblue text-ocean',
    stone: 'bg-stone text-muted',
  };
  return (
    <span className={cn('inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}
