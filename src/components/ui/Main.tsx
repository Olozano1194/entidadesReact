const Main = ({children, ...props}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <main
            className="w-full min-h-screen bg-gradient-to-t from-teal-300/20 via-teal-800/50 to-teal-600/50 flex justify-center items-center p-4" 
            {...props}
        >
            {children}
        </main>
    );
};
export default Main;