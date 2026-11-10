const Main = ({children, ...props}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <main
            className="w-full min-h-screen flex flex-col justify-center items-center p-4 text-on-background z-10" 
            {...props}
        >
            {children}
        </main>
    );
};
export default Main;