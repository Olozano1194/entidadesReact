const Title = ({children, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h2
            className="w-full font-headline-lg flex gap-x-1 justify-center items-center text-white text-headline-lg" 
            {...props}
        >
            {children}
        </h2>
    );
};
export default Title;

