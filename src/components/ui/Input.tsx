import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className = '', ...props }, ref) => {
    return (
        <input
            ref={ref} // Pasar el ref
            className={`border border-slate-200 bg-slate-50/50 duration-200 mt-2 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white ${className}`}
            {...props} 
        />
    );
});
Input.displayName = 'Input';

export default Input;