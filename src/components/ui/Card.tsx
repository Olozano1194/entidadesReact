const Card = ({children, ...props}: React.FormHTMLAttributes<HTMLFormElement>) => {
    return (
        <article 
            className="w-full max-w-md flex flex-col p-container-padding glass-card rounded-lg shadow-lg" 
            {...props}
        >        
            {children}
        </article>
    );
};
export default Card;