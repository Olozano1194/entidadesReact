const Form = ({children, ...props}: React.FormHTMLAttributes<HTMLFormElement>) => {
    return (
        <form 
            className="w-full max-w-md flex flex-col p-8 bg-white rounded-lg shadow-lg" 
            {...props}
        >        
            {children}
        </form>
    );
};
export default Form;