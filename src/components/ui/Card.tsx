interface CardProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

const Card = ({children, className = "", ...props}: CardProps) => {
    return (
        <article 
            className={`grid grid-cols-1 gap-8 lg:grid-cols-12 ${className}`} 
            {...props}
        >        
            {children}
        </article>
    );
};
export default Card;