import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
//Mensajes
import { toast } from 'react-hot-toast';
//API
import { createRol } from '../../../api/roles.api';
//Model
import type { CreateRolDto } from '../../../types/dto/rol.dto';
import type { Rol } from '../../../types/rol.models';
// Icons
import { MdOutlineArrowBack } from "react-icons/md";
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

const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toUpperCase();

const RegisterRol = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Rol>();
    const navigate = useNavigate();
    const nombre = watch('nombre') ?? '';
    const slug = nombre ? `ROLE_${slugify(nombre)}` : '';

    const onSubmit = handleSubmit(async (data: Rol) => {
        try {
            const requestData: CreateRolDto = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                permisos: data.permisos || [],
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
                            icon={<MdOutlineArrowBack className="text-[22px]" />}
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