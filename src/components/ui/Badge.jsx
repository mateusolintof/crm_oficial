import React from 'react';
import { cn } from './Button';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'text-gray-900 border border-gray-200',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
    };

    return (
        <div
            ref={ref}
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

Badge.displayName = 'Badge';

export { Badge };
