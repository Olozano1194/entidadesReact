import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return (
        <input
            ref={ref} // Pasar el ref
            className="w-full bg-slate-100/50 rounded-sm flex justify-center mb-2 p-2 outline-blue-950/35 text-lg"
            {...props} 
        />
    );
});
export default Input;