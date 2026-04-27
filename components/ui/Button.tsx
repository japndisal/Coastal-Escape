import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-ocean text-white hover:bg-ocean/90',
    secondary: 'bg-slate text-white hover:bg-slate/90',
    outline: 'border-2 border-ocean text-ocean hover:bg-ocean hover:text-white',
    ghost: 'text-muted hover:text-slate hover:bg-stone/50',
  };

  const sizes = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-5 py-3',
    lg: 'text-sm px-8 py-4',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
