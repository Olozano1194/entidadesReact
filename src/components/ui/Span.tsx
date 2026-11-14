const Span = ({children, ...props}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <span
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
            {...props}
        >
            {children}
        </span>
    );
};
export default Span;