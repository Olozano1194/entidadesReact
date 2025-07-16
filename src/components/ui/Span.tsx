const Span = ({children, ...props}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <span
            className="flex font-bold gap-1 justify-center items-center p-2 text-lg"
            {...props}
        >
            {children}
        </span>
    );
};
export default Span;