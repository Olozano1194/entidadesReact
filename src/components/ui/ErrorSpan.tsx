const ErrorSpan = ({children, ...props}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <span
            className='text-red-500 pt-1.5 text-sm'
            {...props}
        >
            {children}
        </span>
    );
};
export default ErrorSpan;