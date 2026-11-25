import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Mensajes
import { toast } from 'react-hot-toast';
//API
import { createRol } from '../../../api/roles.api';
//Model
import type { CreateRolDto } from '../../../types/dto/rol.dto';
import type { Rol } from '../../../types/rol.models';
// Components
import FormField from '../../../components/form/FormField';
import FormSection from '../../../components/form/FormSection';

const NIVELES = [
    { value: '1', label: 'Nivel 1 - Super Admin (Control Total)' },
    { value: '2', label: 'Nivel 2 - Directivo / Sede Central' },
    { value: '3', label: 'Nivel 3 - Académico / Claustro Docente' },
    { value: '4', label: 'Nivel 4 - Apoyo Operativo / Secretaría' },
    { value: '5', label: 'Nivel 5 - Estudiante / Tutor Legal' },
];

const PERMISOS_DISPONIBLES = [
    { value: 'crear', label: 'Crear' },
    { value: 'leer', label: 'Leer' },
    { value: 'actualizar', label: 'Actualizar' },
    { value: 'eliminar', label: 'Eliminar' },
];

// Permisos por defecto según el nivel jerárquico
const PERMISOS_POR_NIVEL: Record<string, string[]> = {
    '1': ['crear', 'leer', 'actualizar', 'eliminar'],
    '2': ['crear', 'leer', 'actualizar', 'eliminar'],
    '3': ['leer', 'actualizar'],
    '4': ['leer', 'crear'],
    '5': ['leer'],
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toUpperCase();

const RegisterRol = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Rol>();
    const navigate = useNavigate();
    const nombre = watch('nombre') ?? '';
    const nivel = watch('nivel') ?? '5';
    const slug = nombre ? `ROLE_${slugify(nombre)}` : '';

    // Permisos seleccionados (se inicializan según el nivel)
    const [permisos, setPermisos] = useState<string[]>(PERMISOS_POR_NIVEL[nivel] ?? ['leer']);

    // Cuando cambia el nivel, se actualizan los permisos por defecto
    useEffect(() => {
        const nuevos = PERMISOS_POR_NIVEL[nivel] ?? ['leer'];
        setPermisos(nuevos);
        setValue('permisos', nuevos);
    }, [nivel, setValue]);

    const togglePermiso = (permiso: string) => {
        setPermisos((prev) => {
            const next = prev.includes(permiso)
                ? prev.filter((p) => p !== permiso)
                : [...prev, permiso];
            setValue('permisos', next);
            return next;
        });
    };

    const onSubmit = handleSubmit(async (data: Rol) => {
        try {
            const requestData: CreateRolDto = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                permisos: permisos,
                activo: true,
                nivel: data.nivel,
            };
            await createRol(requestData);
            toast.success('Rol Creado', { duration: 3000, position: 'bottom-right' });
            navigate('/admin/roles');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar el rol';
            toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
        }
    });

    return (
        <main className="flex-1 p-8 max-w-[1440px] mx-auto w-full space-y-section-gap">
            <div className="flex flex-col w-full space-y-gutter">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-label-sm font-label-sm text-outline">
                    <span className="hover:text-primary transition-colors cursor-pointer">Configuración del Sistema</span>
                    <span className="text-outline-variant">›</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">Seguridad</span>
                    <span className="text-outline-variant">›</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">Roles y Permisos</span>
                    <span className="text-outline-variant">›</span>
                    <span className="text-primary font-semibold">Crear Nuevo Rol</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-container-highest">
                    <div className="space-y-1.5 max-w-3xl">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                            Registro y Creación de Rol de Usuario
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Define un nuevo perfil de acceso, jerarquía operativa y descripción institucional.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                        <button type="button" onClick={() => navigate('/admin/roles')} className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-bold text-label-bold transition-all">
                            Cancelar
                        </button>
                        <button type="button" className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary font-label-bold text-label-bold transition-all flex items-center gap-2">
                            Guardar Borrador
                        </button>
                        <button type="submit" form="roleCreationForm" className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold transition-all flex items-center gap-2 shadow-md">
                            Crear y Habilitar Rol
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form id="roleCreationForm" onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 flex flex-col space-y-8">
                        <FormSection
                            title="Información Básica del Rol"
                            description="Parámetros de identificación institucional y clasificación jerárquica"
                            badge="Requerido"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="Nombre Oficial del Rol"
                                    required
                                    placeholder="Ej. Coordinador de Convivencia"
                                    error={errors.nombre?.message}
                                    {...register('nombre', { required: 'Nombre requerido' })}
                                />
                                <FormField
                                    label="Código de Sistema (Slug)"
                                    helpText="Clave unívoca empleada en validaciones de API y JWT."
                                    value={slug}
                                    readOnly
                                    className="cursor-not-allowed select-all font-mono text-[13px] tracking-wide text-on-surface-variant bg-surface-container"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    as="select"
                                    label="Nivel Jerárquico y Alcance"
                                    required
                                    error={errors.nivel?.message}
                                    {...register('nivel', { required: 'Nivel requerido' })}
                                >
                                    {NIVELES.map((n) => (
                                        <option key={n.value} value={n.value}>{n.label}</option>
                                    ))}
                                </FormField>
                                <FormField
                                    as="textarea"
                                    label="Descripción Operativa"
                                    helpText="Describe las responsabilidades institucionales..."
                                    error={errors.descripcion?.message}
                                    rows={3}
                                    {...register('descripcion', { required: 'Descripción requerida' })}
                                />
                            </div>

                            {/* Permisos */}
                            <div className="flex flex-col gap-2">
                                <label className="font-label-bold text-label-bold text-on-surface">
                                    Permisos <span className="text-error">*</span>
                                </label>
                                <p className="font-label-sm text-label-sm text-on-surface-variant">
                                    Se preseleccionan según el nivel. Podés ajustarlos manualmente.
                                </p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {PERMISOS_DISPONIBLES.map((permiso) => (
                                        <label
                                            key={permiso.value}
                                            className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-2 rounded-lg hover:bg-surface-container transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                value={permiso.value}
                                                checked={permisos.includes(permiso.value)}
                                                onChange={() => togglePermiso(permiso.value)}
                                                className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-primary"
                                            />
                                            <span className="font-label-sm text-label-sm text-on-surface">{permiso.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <input type="hidden" {...register('permisos')} value={permisos} />
                            </div>
                        </FormSection>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 flex flex-col space-y-6">
                        <div className="bg-surface-container-low rounded-lg p-4 flex flex-col gap-3">
                            <p className="font-label-bold text-label-bold text-on-surface">Plantillas Rápidas de Rol</p>
                            <p className="text-on-surface-variant font-label-sm text-label-sm">
                                Copia los privilegios de un rol ya establecido como punto de partida:
                            </p>
                            <div className="flex flex-col gap-2 pt-1">
                                <button type="button" className="w-full text-left px-3 py-2 rounded-md bg-surface-container-lowest hover:bg-secondary-fixed/30 text-on-surface text-label-sm font-label-sm flex items-center justify-between transition-colors">
                                    <span>Docente Titular</span>
                                </button>
                                <button type="button" className="w-full text-left px-3 py-2 rounded-md bg-surface-container-lowest hover:bg-secondary-fixed/30 text-on-surface text-label-sm font-label-sm flex items-center justify-between transition-colors">
                                    <span>Secretaría Académica</span>
                                </button>
                                <button type="button" className="w-full text-left px-3 py-2 rounded-md bg-surface-container-lowest hover:bg-secondary-fixed/30 text-on-surface text-label-sm font-label-sm flex items-center justify-between transition-colors">
                                    <span>Coordinador de Convivencia</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RegisterRol;
