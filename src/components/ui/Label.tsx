import type { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    /** Muestra un asterisco rojo de campo requerido */
    required?: boolean;
    /** Elemento a la derecha del label (ej. enlace "¿Olvidaste tu contraseña?") */
    right?: ReactNode;
}

/**
 * Label reutilizable para todos los formularios.
 * Aplica la tipografía `font-label-bold` del design system.
 *
 * @example
 * <Label htmlFor="email" required>Correo electrónico</Label>
 * <Label htmlFor="pass" right={<a href="#">¿Olvidaste?</a>}>Contraseña</Label>
 */
const Label = ({ children, required, right, className = '', ...props }: LabelProps) => (
    <div className={right ? 'flex items-center justify-between' : ''}>
        <label
            className={`font-label-bold text-label-bold text-slate-700 inline-flex items-center gap-1 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-error leading-none">*</span>}
        </label>
        {right}
    </div>
);

export default Label;
