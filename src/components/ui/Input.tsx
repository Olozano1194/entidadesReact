import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return (
        <input
            ref={ref} // Pasar el ref
            className="w-full bg-surface-container-low border border-outline-variant font-body-md flex justify-center pl-9 pr-4 py-4 rounded-lg outline-none text-body-lg text-on-surface transition-all focus:border-primary focus:ring-primary focus:ring-2 md:pl-11"
            {...props} 
        />
    );
});
export default Input;