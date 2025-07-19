const Main = ({children, ...props}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <main
            className="w-full min-h-screen flex justify-center items-center p-4" 
            {...props}
        >
            {children}
        </main>
    );
};
export default Main;