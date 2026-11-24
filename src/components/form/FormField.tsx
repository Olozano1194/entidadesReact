import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { MdExpandMore } from 'react-icons/md';
import Label from '../ui/Label';

// ─── Estilos base compartidos por todos los controles ───────────────────────
const BASE =
    'border border-slate-200 bg-slate-50/50 duration-200 px-4 py-3 rounded-lg text-on-surface transition-all w-full focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30';

// ─── Props del wrapper (nunca llegan al DOM) ─────────────────────────────────
interface WrapperProps {
    label: string;
    required?: boolean;
    error?: string;
    icon?: ReactNode;
    helpText?: string;
    trailing?: ReactNode;
    labelRight?: ReactNode;
    as?: 'input' | 'select' | 'textarea';
    children?: ReactNode;
    className?: string;
}

// Props que se pasan al elemento nativo
type NativeInputProps   = React.InputHTMLAttributes<HTMLInputElement>;
type NativeSelectProps  = React.SelectHTMLAttributes<HTMLSelectElement>;
type NativeTextareaProps= React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = WrapperProps & (NativeInputProps | NativeSelectProps | NativeTextareaProps);

// ─── Componente ──────────────────────────────────────────────────────────────
const FormField = forwardRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    FormFieldProps
>((allProps, ref) => {
    // Extraer props del wrapper — el resto va al elemento nativo
    const {
        label,
        required,
        error,
        icon,
        helpText,
        trailing,
        labelRight,
        as,
        children,
        className = '',
        id,
        name,
        ...nativeProps
    } = allProps;

    const isSelect   = as === 'select';
    const isTextarea = as === 'textarea';

    const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-1">
            {/* Label row */}
            <Label htmlFor={fieldId} required={required} right={labelRight}>
                {label}
            </Label>

            {/* Control wrapper */}
            <div className="relative mt-2">
                {/* Icono izquierdo */}
                {icon && (
                    <span className="absolute flex items-center justify-center left-3.5 pointer-events-none top-1/2 -translate-y-1/2 text-slate-400">
                        {icon}
                    </span>
                )}

                {/* SELECT */}
                {isSelect && (
                    <select
                        {...(nativeProps as NativeSelectProps)}
                        ref={ref as React.Ref<HTMLSelectElement>}
                        id={fieldId}
                        name={name}
                        className={`${BASE} appearance-none cursor-pointer pr-10 ${icon ? 'pl-11' : ''} ${className}`}
                    >
                        {children}
                    </select>
                )}

                {/* TEXTAREA */}
                {isTextarea && (
                    <textarea
                        {...(nativeProps as NativeTextareaProps)}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        id={fieldId}
                        name={name}
                        className={`${BASE} resize-none ${icon ? 'pl-11' : ''} ${className}`}
                    />
                )}

                {/* INPUT (default) */}
                {!isSelect && !isTextarea && (
                    <input
                        {...(nativeProps as NativeInputProps)}
                        ref={ref as React.Ref<HTMLInputElement>}
                        id={fieldId}
                        name={name}
                        className={`${BASE} ${icon ? 'pl-11' : ''} ${trailing ? 'pr-12' : ''} ${className}`}
                    />
                )}

                {/* Chevron del select */}
                {isSelect && (
                    <MdExpandMore className="absolute pointer-events-none right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                )}

                {/* Trailing (ej. botón ojo de contraseña) */}
                {!isSelect && trailing && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {trailing}
                    </div>
                )}
            </div>

            {/* Help text */}
            {helpText && (
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    {helpText}
                </p>
            )}

            {/* Error */}
            {error && (
                <span className="text-error text-sm font-label-sm mt-0.5">{error}</span>
            )}
        </div>
    );
});

FormField.displayName = 'FormField';
export default FormField;
