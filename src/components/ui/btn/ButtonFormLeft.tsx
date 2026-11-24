import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const ButtonFormLeft = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                "border-2 border-primary cursor-pointer font-label-bold px-8 py-2.5 rounded-xl text-primary transition-all hover:bg-emerald-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
export default ButtonFormLeft;
