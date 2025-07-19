const Button = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button 
            className=" bg-primary cursor-pointer flex font-bold justify-center items-center gap-1 mt-5 p-2.5 rounded-lg text-lg text-slate-100 hover:scale-105 hover:bg-secundary-500" 
            {...props}
        >        
            {children}
        </button>
    );
};
export default Button;