import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const ButtonFormRight = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                "bg-gradient-to-r cursor-pointer font-label-bold from-emerald-800 px-8 py-3 rounded-xl shadow-lg to-emerald-600 text-white transition-all hover:shadow-emerald-900/20 hover:-translate-y-0.5",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
export default ButtonFormRight;
