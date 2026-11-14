const Button = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button 
            className="w-full bg-primary-container cursor-pointer flex font-label-bold justify-center items-center gap-2 mt-form-stack py-4 rounded-lg shadow-lg text-label-bold text-on-primary transition-all hover:shadow-xl hover:bg-primary active:scale-95" 
            {...props}
        >        
            {children}
        </button>
    );
};
export default Button;