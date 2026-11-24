import { twMerge } from "tailwind-merge";

// Combina clases de Tailwind resolviendo conflictos.
// Las clases del consumidor (className) sobrescriben las del componente base.
export function cn(...classes: (string | undefined | null | false)[]) {
    return twMerge(classes.filter(Boolean).join(" "));
}
