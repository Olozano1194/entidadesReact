import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//form
import { useForm } from "react-hook-form";
//Apis
import { login } from "../../api/user.api";
//ui
import Main from '../../components/ui/Main';
import Card from "../../components/ui/Card";
import AuthDecoration from "../../components/ui/AuthDecoration";
import Title from "../../components/ui/Title";
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import FormField from "../../components/ui/FormField";
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
    const [showkPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDto>();

    const onSubmit = handleSubmit(async (data: LoginUserDto) => {
        try {
            const response = await login(data);
            //console.log('Login successful, result:', response);

            if (response && response.token) {
                //console.log('Login successful, token:', response.token);

                const response = await login({
                    email: data.email.toLowerCase().trim(),
                    password: data.password
                });

                //console.log('Respuesta del login:', response);

                if (response && response.token) {
                    //El token ya se guardo en la función login                    
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
                }
                localStorage.setItem('token', response.token);
                // Redirect to the dashboard
                navigate('/admin');
            } else {
                //console.error('Token not found in response');
                toast.success('Respuesta inválida del servidor', {
                    duration: 3000,
                    position: 'bottom-right',
                    style: {
                        background: '#4b5563',   // Fondo negro
                        color: '#fff',           // Texto blanco
                        padding: '16px',
                        borderRadius: '8px',
                    },
                });
            }

        } catch (error) {
            console.error('Error logging in:', error);
            toast.success('Error al iniciar sesión', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: '#4b5563',   // Fondo negro
                    color: '#fff',           // Texto blanco
                    padding: '16px',
                    borderRadius: '8px',
                },
            });
        }
    });

    // Visibilidad del pass
    const handlePass = () => {
        setShowPass(!showkPass);
    };

    return (
        <Main>
            {/* Title */}
            <div className='w-full flex flex-col items-center mb-container-padding'>
                <div className="bg-white/10 backdrop-blur-sm mb-4 p-4 rounded-xl">
                    <MdOutlineAutoStories className="text-white text-4xl" />
                </div>
                <Title>
                    EduControl
                </Title>
                <p className="font-body-md text-body-md text-on-primary-container opacity-90">Acceso al Panel de Administración</p>
            </div>
            <article className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute bg-tertiary blur-[120px] h-[50%] -left-[10%] rounded-full -top-[10%] w-[50%]"></div>
                <div className="absolute bg-primary-fixed blur-[100px] -bottom-[10%] h-[40%] rounded-full -right-[10%] w-[40%]"></div> 
            </article>
            <AuthDecoration />
            <Card>
                <div className="mb-container-padding">
                    <h2 className="font-headline-md mb-3 text-headline-md text-on-surface">
                        Bienvenido de nuevo
                    </h2>
                    <p className="font-body-md leading-tight text-body-md text-on-surface-variant">
                        Por favor, introduce tus credenciales para acceder al panel de control de tu centro educativo.
                    </p>
                </div>
                <form onSubmit={onSubmit}>
                    {/* Email */}
                    <FormField
                        label="Correo Administrativo"
                        htmlFor="email"
                        icon={<MdOutlineEmail className='lg:text-2xl' />}
                        error={errors.email?.message}
                    >
                        <Input type="email" placeholder="admin@educontrol.com" id="email"
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
                    </FormField>
                    {/* Password */}
                    <FormField
                        label="Contraseña"
                        htmlFor="password"
                        icon={<CiLock className='lg:text-2xl xl:text-xl' />}
                        error={errors.password?.message}
                        labelRight={<Link to='#' className="font-label-sm text-label-sm text-primary transition-colors hover:text-tertiary">Has olvidado tu contraseña?</Link>}
                        trailing={
                            <button type="button" onClick={handlePass} className="absolute top-1/2 -translate-y-1/2 text-outline right-4 hover:text-on-surface-variant">
                                {showkPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </button>
                        }
                    >
                        <Input
                            type={showkPass ? "text" : "password"}
                            id="password"
                            placeholder="Escriba su contraseña"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Contraseña requerida'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'La contraseña debe tener minimo 5 carácteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'La contraseña debe tener como máximo 20 carácteres'
                                },
                            })}
                        />
                    </FormField>
                    {/* Btn */}
                    <Button type="submit">
                        Iniciar Sesión <RiLoginBoxLine className='text-lg' />
                    </Button>                    
                </form>
                <section className="border-t border-outline-variant/30 mt-container-padding pt-container-padding text-center">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Eres estudiante?
                        <Link to="/auth/student-login" className="font-bold text-primary hover:underline"> Acceder al portal de estudiantes</Link>
                    </p>
                </section>
            </Card>
        </Main>
    );
};
export default Login;