import React from 'react';
import { cn } from './Button';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-primary-soft text-primary border border-primary/30',
        secondary: 'bg-slate-100 text-ink border border-border',
        outline: 'text-ink border border-border bg-transparent',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border border-amber-100',
        danger: 'bg-rose-50 text-rose-700 border border-rose-100',
        info: 'bg-primary-soft text-primary border border-primary/20',
    };

    return (
        <div
            ref={ref}
            className={cn(
                'inline-flex items-center rounded-full border px-2 py-[3px] text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

Badge.displayName = 'Badge';

export { Badge };
