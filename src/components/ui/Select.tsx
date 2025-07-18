const Select = ({children, ...props}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
    return (
        <select 
            className="w-full bg-slate-100/50 cursor-pointer rounded-sm flex justify-center mb-2 p-2 outline-blue-950/35 text-lg" 
            {...props}
        >        
            {children}
        </select>
    );
};
export default Select;
