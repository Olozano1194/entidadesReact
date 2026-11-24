import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//form
import { useForm } from "react-hook-form";
//Apis
import { login } from "../../api/user.api";
//ui
import Main from '../../components/ui/Main';
import AuthDecoration from "../../components/ui/AuthDecoration";
import Title from "../../components/ui/Title";
import FormField from '../../components/form/FormField';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { LoginUserDto } from '../../types/dto/user.dto';
//Icons
import { RiLoginBoxLine } from "react-icons/ri";
import { MdOutlineAutoStories, MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";


const Login = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDto>();

    const onSubmit = handleSubmit(async (data: LoginUserDto) => {
        try {
            const response = await login({
                email: data.email.toLowerCase().trim(),
                password: data.password
            });

            // El backend envuelve la respuesta en { data: { token, user } }
            const token = response?.data?.token ?? response?.token;
            const user = response?.data?.user ?? response?.user;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('loginTime', String(Date.now()));
                if (user) localStorage.setItem('user', JSON.stringify(user));
                toast.success('Inicio de sesión exitoso', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: '#4b5563',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '10px',
                    },
                });
                navigate('/admin');
            } else {
                toast.error('Respuesta inválida del servidor', {
                    duration: 3000,
                    position: 'bottom-right',
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error al iniciar sesión', {
                duration: 3000,
                position: 'bottom-right',
            });
        }
    });

    // Visibilidad del pass
    const handlePass = () => {
        setShowPass(!showPass);
    };

    return (
        <>
            <section className="flex items-center justify-center min-h-screen px-4 w-full">
                <section className="max-w-[480px] w-full z-10">
                {/* Title */}
                <div className="flex flex-col items-center mb-container-padding w-full">
                    <div className="bg-white/10 backdrop-blur-sm mb-4 p-4 rounded-xl">
                        <MdOutlineAutoStories className="text-white text-4xl" />
                    </div>
                    <Title>
                        EduControl
                    </Title>
                    <p className="font-body-md text-body-md text-on-primary-container opacity-90">Acceso al Panel de Administración</p>
                </div>
                <Main>
                    {/* Header Form */}
                    <div className="mb-8">
                        <h2 className="font-headline-md mb-3 text-headline-md text-on-surface">
                            Bienvenido de nuevo
                        </h2>
                        <p className="font-body-md leading-tight text-body-md text-on-surface-variant">
                            Por favor, introduce tus credenciales para acceder al panel de control de tu centro educativo.
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-form-stack">
                        {/* Email */}
                        <FormField
                            label="Correo Administrativo"
                            type="email"
                            id="email"
                            icon={<MdOutlineEmail className='text-xl' />}
                            placeholder="admin@educontrol.com"
                            error={errors.email?.message}
                            {...register('email', {
                                required: { value: true, message: 'Correo requerido' },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Correo invalido'
                                },
                            })}
                        />
                        {/* Password */}
                        <FormField
                            label="Contraseña"
                            type={showPass ? "text" : "password"}
                            id="password"
                            icon={<CiLock className='text-xl' />}
                            placeholder="Escriba su contraseña"
                            labelRight={<Link to='#' className="font-label-sm text-label-sm text-primary transition-colors hover:text-tertiary">Has olvidado tu contraseña?</Link>}
                            trailing={
                                <button type="button" onClick={handlePass} className="cursor-pointer text-outline hover:text-on-surface-variant">
                                    {showPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                                </button>
                            }
                            error={errors.password?.message}
                            {...register('password', {
                                required: { value: true, message: 'Contraseña requerida' },
                                minLength: { value: 5, message: 'La contraseña debe tener minimo 5 carácteres' },
                                maxLength: { value: 20, message: 'La contraseña debe tener como máximo 20 carácteres' },
                            })}
                        />
                        {/* Btn */}
                        <button 
                            type="submit" 
                            className="bg-primary-container cursor-pointer flex font-label-bold justify-center items-center gap-2 mt-form-stack py-4 rounded-lg shadow-lg text-label-bold text-on-primary transition-all w-full hover:shadow-xl hover:bg-primary active:scale-95"
                        >
                            Iniciar Sesión 
                            <RiLoginBoxLine className='text-lg' />
                        </button>
                    </form>
                    <div className="border-t border-outline-variant/30 mt-8 pt-8 text-center">
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Eres estudiante?
                            <Link to="/auth/student-login" className="font-bold text-primary hover:underline"> Acceder al portal de estudiantes</Link>
                        </p>
                    </div>
                </Main>
                </section>
                <article className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute bg-tertiary blur-[120px] h-[50%] -left-[10%] rounded-full -top-[10%] w-[50%]"></div>
                        <div className="absolute bg-primary-fixed blur-[100px] -bottom-[10%] h-[40%] rounded-full -right-[10%] w-[40%]"></div>
                </article>
            </section>
            <AuthDecoration />  
        </>
    );
};
export default Login;