const Main = ({children, ...props}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <main
            className="bg-background flex flex-col glass-card p-5 rounded-xl w-full sm:p-8 md:p-10" 
            {...props}
        >
            {children}
        </main>
    );
};
export default Main;