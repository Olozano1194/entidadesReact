import type { ReactNode, ChangeEvent, FocusEvent, Ref } from "react";
import Select from "../ui/Select";

// Props comunes a todos los tipos de campo
interface BaseFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    icon?: ReactNode;
    helpText?: string;
    trailing?: ReactNode;
}
// Props para un input normal
interface InputFieldProps extends BaseFieldProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    className?: string;
    name?: string;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    ref?: Ref<HTMLInputElement>;
}
// Props para un select
interface SelectFieldProps extends BaseFieldProps {
    as: "select";
    children: ReactNode;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
    ref?: Ref<HTMLSelectElement>;
}
// Props para un textarea
interface TextareaFieldProps extends BaseFieldProps {
    as: "textarea";
    placeholder?: string;
    rows?: number;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    ref?: Ref<HTMLTextAreaElement>;
}

type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

// Estilos base compartidos por todos los campos
const baseClass = "border border-slate-200 bg-slate-50/50 px-4 py-3 pl-10 rounded-lg text-on-surface transition-all w-full focus:outline-none focus:border-primary focus:bg-white";

const FormField = (props: FormFieldProps) => {
    const { label, required, error, icon, helpText, trailing } = props;

    // Determinar si es select o textarea
    const isSelect = (props as SelectFieldProps).as === "select";
    const isTextarea = (props as TextareaFieldProps).as === "textarea";

    return (
        <div className="flex flex-col gap-2">
            {/* Label */}
            <label className="font-label-bold text-label-bold text-on-surface flex items-center gap-1">
                {label}
                {required && <span className="text-error">*</span>}
            </label>

            {/* Input / Select / Textarea */}
            <div className="relative">
                {/* Icono a la izquierda */}
                {icon && (
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">
                        {icon}
                    </span>
                )}
                {/* Select */}
                {isSelect && (
                    <Select
                        {...(props as SelectFieldProps)}
                        className={`px-4 py-3 ${icon ? 'pl-10' : ''}`}
                    >
                        {(props as SelectFieldProps).children}
                    </Select>
                )}
                {/* Textarea */}
                {isTextarea && (
                    <textarea
                        {...(props as TextareaFieldProps)}
                        className={`${baseClass} resize-none ${icon ? 'pl-10' : ''}`}
                    />
                )}
                {/* Input (por defecto) */}
                {!isSelect && !isTextarea && (
                    <input
                        {...(props as InputFieldProps)}
                        className={`${baseClass} ${icon ? 'pl-10' : ''} ${(props as InputFieldProps).className ?? ""}`}
                    />
                )}
                {/* Elemento trailing (ej. botón de mostrar contraseña) */}
                {trailing && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {trailing}
                    </div>
                )}
            </div>
            {/* Texto de ayuda */}
            {helpText && (
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {helpText}
                </p>
            )}
            {/* Error */}
            {error && (
                <span className="text-red-500 text-sm">{error}</span>
            )}
        </div>
    );
};
export default FormField;