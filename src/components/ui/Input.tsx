import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    trailing?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', icon, trailing, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {icon && (
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
                    {icon}
                </span>
            )}
            <input
                ref={ref}
                className={`border border-slate-200 bg-slate-50/50 duration-200 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 ${icon ? 'pl-11' : ''} ${trailing ? 'pr-12' : ''} ${className}`}
                {...props}
            />
            {trailing && (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                    {trailing}
                </span>
            )}
        </div>
    );
});
Input.displayName = 'Input';

export default Input;