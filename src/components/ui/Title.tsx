const Title = ({children, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h2
            className="w-full font-bold flex gap-x-1 justify-center items-center text-2xl p-4 md:text-3xl" 
            {...props}
        >
            {children}
        </h2>
    );
};
export default Title;

