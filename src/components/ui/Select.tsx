import type { SelectHTMLAttributes, ReactNode } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
}

const Select = ({children, className= '', ...props}: SelectProps) => {
    return (
        <>
        <select 
            className={`appearance-none bg-slate-50/50 border border-slate-200 cursor-pointer focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary px-3.5 py-2.5 rounded-lg text-on-surface transition-all w-full ${className}`} 
            {...props}
        >        
            {children}
        </select>
        <MdExpandMore className='absolute pointer-events-none right-4 top-1/2 text-slate-400 -translate-y-1/2' />
        </>
    );
};
export default Select;
