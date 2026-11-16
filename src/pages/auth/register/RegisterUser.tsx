import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
//Mensajes
import { toast } from 'react-hot-toast';
//ui
import Main from '../../../components/ui/Main';
import Card from '../../../components/ui/Card';
import ErrorSpan from '../../../components/ui/ErrorSpan';
//icons
import { RiShieldUserLine, RiLock2Fill, RiKeyFill } from "react-icons/ri";
import { MdOutlineSecurity, MdContactMail, MdAlternateEmail, MdExpandMore, MdOutlineVisibility, MdOutlineVerifiedUser, MdOutlineInfo, MdOutlineHowToReg, MdHistory, MdOutlineMailLock } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
//Api
import { CreateUsers } from '../../../api/user.api';
// import { getRoles } from '../../../api/roles.api';
//Model
import type { User } from '../../../types/user.model';
import type { CreateUserDto } from '../../../types/dto/user.dto';
// import type { Rol } from '../../../types/rol.models';


const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<User>();
    // const [roles, setRoles] = useState<Rol[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRoles = async () => {
            try {
                // const rolesData = await getRoles();
                // setRoles(rolesData);
            } catch (error) {
                console.error('Error al cargar roles:', error);
            }
        }
        loadRoles();
    }, []);

    // const handleRolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const rolId = event.target.value;
    //     console.log('ID del rol seleccionado:', rolId);
    //     setValue('rol', rolId);
    // };

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

            toast.success('Usuario Creado', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: '#4b5563',   // Fondo negro
                    color: '#fff',           // Texto blanco
                    padding: '16px',
                    borderRadius: '8px',
                },

            });
            navigate('/admin');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar el usuario';
            toast.error(errorMessage, {
                duration: 3000,
                position: 'bottom-right',
            });
        }
    });

    return (
        <Main className='max-w-[1200px] mx-auto p-8'>
            <header className='mb-12'>
                <div className='flex gap-3 items-center mb-2'>
                    <span className='bg-secondary-container font-bold px-3 py-1 rounded-full text-on-secondary-container text-xs tracking-wider uppercase'>
                        Gestión de usuarios
                    </span>
                </div>
                <h2 className='font-display-xl mb-2 text-display-xl text-on-surface'>
                    Crear nuevo usuario de la plataforma
                </h2>
                <p className='font-body-lg max-w-2xl text-body-lg text-on-surface-variant'>
                    Habilitar el acceso para nuevos miembros del profesorado, estudiantes o administradores. Asegurarse de que todas las credenciales cumplan con la politica de seguridad de la institución.
                </p>
            </header>
            {/* Form container */}
            <Card>
                {/* Left Column */}
                <section className='flex flex-col gap-6 lg:col-span-4'>
                    <div className='bg-white border border-slate-100 p-8 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
                        <div className='bg-emerald-50 flex h-12 w-12 items-center justify-center mb-6 rounded-xl text-emerald-800'>
                            <MdOutlineSecurity className='text-3xl' />
                        </div>
                        <h3 className='font-headline-md mb-4 text-headline-md text-on-surface'>
                            Estándares de seguridad
                        </h3>
                        <ul className='space-y-4'>
                            <li className='flex gap-3 items-start'>
                                <BiCheckCircle className='mt-0.5 text-emerald-600 text-lg shrink-0' />
                                <p className='text-sm text-on-surface-variant leading-relaxed'>
                                    Mínimo 8 caracteres con variedad alfanumérica.
                                </p>
                            </li>
                            <li className='flex gap-3 items-start'>
                                <BiCheckCircle className='mt-0.5 text-emerald-600 text-lg shrink-0' />
                                <p className='text-sm text-on-surface-variant leading-relaxed'>
                                    El correo electrónico debe ser una dirección con dominio institucional.
                                </p>
                            </li>
                            <li className='flex gap-3 items-start'>
                                <BiCheckCircle className='mt-0.5 text-emerald-600 text-lg shrink-0' />
                                <p className='text-sm text-on-surface-variant leading-relaxed'>
                                    Los permisos del rol se aplican inmediatamente tras su creación.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='relative flex-1 min-h-[220px] w-full overflow-hidden rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcdCvobV-anr2_SEKJRnGusOGHassr6cIlrGg7QjYgrxB6Zroqf1oPWy4eggxyIt8V1Aj8XRS4rfOevNxNNlH73jIZQoFtx7QaEdJEPnPSZL2vuhr_J5T-ThF60M8EYDdgbhWluT0xurBz4BdjLFFc-75l6qzH94zjOreFc4-Di3Ta83UPUUGdfKm7UNWKFcilhDwzKeeIAKYLj29xnNzr0bt5qZrNaXasQVAFpoJVHmCW4EtDR_jWlqniIxQfAOyLN3FB-iZdjqe-"
                            alt="Red académica"
                            className='h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 bg-emerald-950/40 mix-blend-multiply' />
                        <div className='absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent flex flex-col justify-end p-6'>
                            <p className='font-bold leading-tight text-white text-lg'>
                                Únete a nuestra red académica hoy mismo.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Right Column */}
                <section className='lg:col-span-8 flex flex-col'>
                    <div className='bg-white border border-slate-100 p-8 lg:p-10 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] flex-1 flex flex-col'>
                        <form onSubmit={onSubmit} className='space-y-8 flex-1 flex flex-col justify-between'>
                            {/* Person Information */}
                            <article className='space-y-6'>
                                <div className='border-b border-slate-100 flex gap-2 items-center mb-6 pb-2'>
                                    <MdContactMail className='text-emerald-800' />
                                    <h4 className='font-headline-md text-headline-md text-emerald-900'>
                                        Identidad de la cuenta
                                    </h4>
                                </div>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <label htmlFor="" className='font-bold flex gap-1 items-center text-label-bold text-on-surface'>
                                            Correo Institucional
                                            <span className='text-error'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <MdAlternateEmail className='absolute left-4 top-1/2 text-slate-400 text-lg -translate-y-1/2' />
                                            <input
                                                type="text"
                                                className='border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-lg text-on-surface transition-all w-full focus:border-emerald-700 focus:bg-white'
                                                placeholder='e.g. j.doe@institucion.edu'
                                                {...register('email', {
                                                    required: {
                                                        value: true,
                                                        message: 'Correo requerido'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: 'Correo invalido'
                                                    },
                                                })}
                                            />
                                        </div>
                                        {
                                            errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>
                                        }
                                    </div>
                                    <div className='space-y-2'>
                                        <label htmlFor="" className='font-label-bold flex gap-1 items-center text-label-bold text-on-surface'>
                                            Rol de acceso
                                            <span className='text-error'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <RiShieldUserLine className='absolute left-4 top-1/2 text-slate-400 text-lg -translate-y-1/2' />
                                            <select name="" id="" className='appearance-none border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-lg text-on-surface transition-all w-full focus:border-emerald-700 focus:bg-white'></select>
                                            <MdExpandMore className='absolute pointer-events-none right-4 top-1/2 text-slate-400 -translate-y-1/2' />
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Credentials Section */}
                            <article className='space-y-6'>
                                <div className='border-b border-slate-100 flex gap-2 mb-6 pb-2'>
                                    <RiLock2Fill className='text-emerald-800' />
                                    <h4 className='font-headline-md text-headline-md text-emerald-900'>Credenciales de seguridad</h4>
                                </div>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    {/* password */}
                                    <div className='space-y-2'>
                                        <label htmlFor="" className='font-label-bold flex gap-1 items-center text-label-bold text-on-surface'>
                                            Contraseña
                                            <span className='text-error'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <RiKeyFill className='absolute left-4 text-lg top-1/2 text-slate-400 -translate-y-1/2' />
                                            <input type="password"
                                                className='border border-slate-200 bg-slate-50 pl-11 pr-12 py-3 rounded-lg text-on-surface transition-all w-full focus:border-emerald-700 focus:bg-white'
                                                placeholder='********'
                                                {...register('password', {
                                                    required: {
                                                        value: true,
                                                        message: 'Contraseña requerido'
                                                    },
                                                    minLength: {
                                                        value: 5,
                                                        message: 'La contraseña debe tener al menos 5 caracteres'
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: 'La contraseña debe tener como maximo 20 caracteres'
                                                    },
                                                })}
                                            />
                                            <button className='absolute right-4 top-1/2 text-slate-400 -translate-y-1/2'>
                                                <MdOutlineVisibility />
                                            </button>
                                        </div>
                                        {
                                            errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>
                                        }
                                    </div>
                                    {/* confirma password */}
                                    <div className='space-y-2'>
                                        <label htmlFor="" className='font-label-bold flex gap-1 items-center text-label-bold text-on-surface'>
                                            Confirmar Contraseña
                                            <span className='text-error'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <MdOutlineVerifiedUser className='absolute left-4 top-1/2 text-lg text-slate-400 -translate-y-1/2' />
                                            <input type="password"
                                                className='border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 rounded-lg text-on-surface transition-all w-full focus:border-emerald-700 focus:bg-white'
                                                placeholder='*******'
                                                {...register('repeatPassword', {
                                                    required: {
                                                        value: true,
                                                        message: 'confirmar Contraseña requerida'
                                                    },
                                                    validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
                                                })}
                                            />
                                        </div>
                                        {
                                            errors.repeatPassword && <ErrorSpan>{errors.repeatPassword.message}</ErrorSpan>
                                        }
                                    </div>
                                </div>
                                <div className='bg-emerald-50/50 border border-emerald-100/50 flex gap-3 p-4 rounded-lg'>
                                    <MdOutlineInfo className='text-emerald-700' />
                                    <p className='leading-relaxed text-xs text-on-secondary-fixed-variant'>
                                        Las contraseñas deben ser una combinación de letras mayúsculas, minúsculas, números y simbolos para garantizar la máxima integridad de la plataforma.
                                    </p>
                                </div>
                            </article>
                            <div className='border-t border-slate-100 flex flex-col gap-4 items-center justify-end pt-8 sm:flex-row'>
                                <button className='font-label-bold px-8 py-3 rounded-lg text-emerald-800 transition-colors w-full hover:bg-emerald-50 sm:w-auto'>
                                    Cancelar y restablecer
                                </button>
                                <button className='accent-gradient flex font-label-bold gap-2 items-center justify-center px-12 py-3 rounded-lg shadow-lg text-white transition-all w-full hover:shadow-emerald-900/20 active:scale-[0.98]  sm:w-auto'>
                                    <MdOutlineHowToReg className='text-xl' />
                                    Registrar nuevo usuario
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Post-Form Contaxt */}
                    <section className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2'>
                        <div className='bg-slate-100/50 flex gap-4 items-center p-6 rounded-xl'>
                            <div className='bg-white flex h-10 items-center justify-center rounded-full shadow-sm w-10'>
                                <MdHistory className='text-slate-600' />
                            </div>
                            <div>
                                <h5 className='font-bold text-xs text-on-surface'>
                                    Creado recientemente
                                </h5>
                                <p className='text-[1rem] text-slate-500'>
                                    Sarah Jenkis(Profesora) -Hace 2m
                                </p>
                            </div>
                        </div>
                        <div className='bg-slate-100/50 flex gap-4 items-center p-6 rounded-xl'>
                            <div className='bg-white flex h-10 items-center justify-center rounded-full shadow-sm w-10'>
                                <MdOutlineMailLock className='text-slate-600' />
                            </div>
                            <div>
                                <h5 className='font-bold text-xs text-on-surface'>
                                    Notificación automática
                                </h5>
                                <p className='text-[1rem] text-slate-500'>
                                    El correo electrónico de bienvenida se enviará automáticamente.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>
                {/* Roles */}
                {/* <label htmlFor="roles"><Span><RiUserSettingsLine />Rol</Span>
                    <Select
                        {...register('rol', {
                            required: {
                                value: true,
                                message: 'Rol requerido'
                            }
                        })}
                    // onChange={handleRolChange}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map(rol => (

                            <option key={rol._id} value={rol._id}>
                                {rol.nombre}
                            </option>
                        )
                        )
                        }
                    </Select>
                </label>
                {
                    errors.rol && <span className='text-red-500 text-sm'>{errors.rol.message}</span>
                } */}
                {/* Instituciones */}
                {/* <label htmlFor="instituciones"><Span><CiUser/>Instituciones</Span><Select
                {...register('idinstitucion',{
                    required: {
                        value: true,
                        message: 'Instituciones requerida'
                    },
                })}>
                        <option value="">Escoge la institución</option>
                        <option value="admin">Perez y Aldana</option>
                        <option value="recepcion">Clemencia Caicedo y Velez</option>
                        <option value="recepcion">Tulio Barón</option>
                    </Select>
                </label>
                {
                    errors.idinstitucion && <span className='text-red-500 text-sm'>{errors.idinstitucion.message}</span>
                }                      */}


            </Card>
        </Main>
    );
};
export default RegisterUser;