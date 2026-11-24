import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-on-primary hover:bg-primary-container shadow-md",
    secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
    outline: "border-2 border-primary text-primary hover:bg-emerald-50",
    ghost: "text-on-surface hover:bg-surface-container",
    danger: "bg-error text-on-error hover:bg-error/90",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", className = "", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "cursor-pointer font-label-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;