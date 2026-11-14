const ErrorSpan = ({children, ...props}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className='text-error text-sm'
            {...props}
        >
            {children}
        </span>
    );
};
export default ErrorSpan;