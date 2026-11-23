import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
//Mensajes
import { toast } from 'react-hot-toast';
//icons
import { MdAlternateEmail, MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineSecurity, MdOutlineVerifiedUser, MdOutlineInfo } from "react-icons/md";
import { RiShieldUserLine, RiKeyFill } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
//Api
import { CreateUsers } from '../../../api/user.api';
import { getRoles } from '../../../api/roles.api';
//Model
import type { User } from '../../../types/user.model';
import type { CreateUserDto } from '../../../types/dto/user.dto';
import type { Rol } from '../../../types/rol.models';
// Components
import FormField from '../../../components/form/FormField';
import FormSection from '../../../components/form/FormSection';

const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<User>();
    const [roles, setRoles] = useState<Rol[]>([]);
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al cargar roles:', error);
            }
        }
        loadRoles();
    }, []);

    const onSubmit = handleSubmit(async (data: User) => {
        try {
            if (!data.rol) {
                toast.error('Debe seleccionar un rol válido');
                return;
            }
            const requestData: CreateUserDto = {
                email: data.email.toLowerCase(),
                password: data.password,
                rol: data.rol,
                idinstitucion: data.idinstitucion,
            };
            await CreateUsers(requestData);
            reset();
            toast.success('Usuario Creado', { duration: 3000, position: 'bottom-right' });
            navigate('/admin');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar el usuario';
            toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
        }
    });

    const handlePass = () => setShowPass(!showPass);

    return (
        <main className="max-w-[1200px] mx-auto p-8">
            <header className="mb-12">
                <div className="flex gap-3 items-center mb-2">
                    <span className="bg-secondary-container font-bold px-3 py-1 rounded-full text-on-secondary-container text-xs tracking-wider uppercase">
                        Gestión de usuarios
                    </span>
                </div>
                <h2 className="font-display-xl mb-2 text-display-xl text-on-surface">
                    Crear nuevo usuario de la plataforma
                </h2>
                <p className="font-body-lg max-w-2xl text-body-lg text-on-surface-variant">
                    Habilitar el acceso para nuevos miembros del profesorado, estudiantes o administradores. Asegurarse de que todas las credenciales cumplan con la politica de seguridad de la institución.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Column */}
                <section className="flex flex-col gap-6 lg:col-span-4">
                    <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                        <div className="bg-emerald-50 flex h-12 w-12 items-center justify-center mb-6 rounded-xl text-emerald-800">
                            <MdOutlineSecurity className="text-3xl" />
                        </div>
                        <h3 className="font-headline-md mb-4 text-headline-md text-on-surface">
                            Estándares de seguridad
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <BiCheckCircle className="mt-0.5 text-emerald-600 text-lg shrink-0" />
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Mínimo 8 caracteres con variedad alfanumérica.
                                </p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <BiCheckCircle className="mt-0.5 text-emerald-600 text-lg shrink-0" />
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    El correo electrónico debe ser una dirección con dominio institucional.
                                </p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <BiCheckCircle className="mt-0.5 text-emerald-600 text-lg shrink-0" />
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Los permisos del rol se aplican inmediatamente tras su creación.
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Right Column */}
                <section className="lg:col-span-8 flex flex-col">
                    <div className="bg-white border border-slate-100 p-8 lg:p-10 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] flex-1 flex flex-col">
                        <form onSubmit={onSubmit} className="space-y-8 flex-1 flex flex-col justify-between">
                            <FormSection
                                title="Identidad de la cuenta"
                                description="Datos de acceso y rol asignado"
                                icon={<MdOutlineSecurity className="text-[22px]" />}
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        label="Correo Institucional"
                                        required
                                        type="email"
                                        placeholder="e.g. j.doe@institucion.edu"
                                        icon={<MdAlternateEmail className="text-lg" />}
                                        error={errors.email?.message}
                                        {...register('email', {
                                            required: { value: true, message: 'Correo requerido' },
                                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Correo invalido' },
                                        })}
                                    />
                                    <FormField
                                        as="select"
                                        label="Rol de acceso"
                                        required
                                        icon={<RiShieldUserLine className="text-lg" />}
                                        error={errors.rol?.message}
                                        {...register('rol', { required: { value: true, message: 'Rol requerido' } })}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((rol) => (
                                            <option key={rol._id} value={rol._id}>{rol.nombre}</option>
                                        ))}
                                    </FormField>
                                </div>
                            </FormSection>

                            <FormSection
                                title="Credenciales de seguridad"
                                description="Contraseña y confirmación"
                                icon={<RiKeyFill className="text-[22px]" />}
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        label="Contraseña"
                                        required
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="********"
                                        icon={<RiKeyFill className="text-lg" />}
                                        trailing={
                                            <button type="button" onClick={handlePass} className="cursor-pointer text-slate-400 hover:text-on-surface-variant">
                                                {showPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                            </button>
                                        }
                                        error={errors.password?.message}
                                        {...register('password', {
                                            required: { value: true, message: 'Contraseña requerido' },
                                            minLength: { value: 5, message: 'La contraseña debe tener al menos 5 caracteres' },
                                            maxLength: { value: 20, message: 'La contraseña debe tener como maximo 20 caracteres' },
                                        })}
                                    />
                                    <FormField
                                        label="Confirmar Contraseña"
                                        required
                                        type="password"
                                        placeholder="*******"
                                        icon={<MdOutlineVerifiedUser className="text-lg" />}
                                        error={errors.repeatPassword?.message}
                                        {...register('repeatPassword', {
                                            required: { value: true, message: 'confirmar Contraseña requerida' },
                                            validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
                                        })}
                                    />
                                </div>
                                <div className="bg-emerald-50/50 border border-emerald-100/50 flex gap-3 p-4 rounded-lg">
                                    <MdOutlineInfo className="text-emerald-700" />
                                    <p className="leading-relaxed text-xs text-on-secondary-fixed-variant">
                                        Las contraseñas deben ser una combinación de letras mayúsculas, minúsculas, números y simbolos para garantizar la máxima integridad de la plataforma.
                                    </p>
                                </div>
                            </FormSection>

                            <div className="border-t border-slate-100 flex flex-col gap-4 items-center justify-end pt-8 sm:flex-row">
                                <button type="button" onClick={() => navigate('/admin')} className="cursor-pointer font-label-bold px-8 py-3 rounded-lg text-emerald-800 transition-colors w-full hover:bg-emerald-50 sm:w-auto">
                                    Cancelar y restablecer
                                </button>
                                <button type="submit" className="accent-gradient cursor-pointer flex font-label-bold gap-2 items-center justify-center px-12 py-3 rounded-lg shadow-lg text-white transition-all w-full hover:shadow-emerald-900/20 active:scale-[0.98] sm:w-auto">
                                    Registrar nuevo usuario
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};
export default RegisterUser;