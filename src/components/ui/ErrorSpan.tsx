const ErrorSpan = ({children, ...props}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className='text-error text-sm font-label-sm mt-0.5'
            {...props}
        >
            {children}
        </span>
    );
};
export default ErrorSpan;