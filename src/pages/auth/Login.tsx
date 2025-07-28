import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//form
import { useForm } from "react-hook-form";
//Apis
import { login } from "../../api/user.api";
//ui
import Main from '../../components/ui/Main';
import Form from "../../components/ui/Form";
import Title from "../../components/ui/Title";
import Span from "../../components/ui/Span";
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ErrorSpan from "../../components/ui/ErrorSpan";
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { LoginUserDto } from '../../model/dto/user.dto';
//Icons
import { RiLoginBoxLine, RiMailFill, RiLockFill } from "react-icons/ri";
//img
import icons from '../../assets/favicon-32x32.png'

const Login = () => {
    const navigate = useNavigate();
    const {  register, handleSubmit, formState: {errors} } = useForm<LoginUserDto>();

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
            }else {
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

    return (
       <Main>              
            <Form onSubmit={onSubmit}>
                <div className='w-full flex justify-center'>
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />Plataforma <span className="text-teal-800 w-full">Educativa</span></Title>
                </div>
                {/* Email */}
                <label htmlFor="email">
                    <Span><RiMailFill className='lg:text-2xl' />Correo</Span>
                    <Input type="email" placeholder="Escribir correo electrónico"
                        {...register('email',{
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
                </label>
                {
                    errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>
                }
                {/* Password */}
                <label htmlFor="password">
                    <Span><RiLockFill className='lg:text-2xl xl:text-xl' />Contraseña</Span>
                    <Input type="password" placeholder="Escriba su contraseña"
                        {...register('password',{
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
                </label>
                {
                    errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>
                }
                {/* Btn */}
                <Button type="submit">
                    <RiLoginBoxLine className='text-secondary-500'/>                    
                    Iniciar Sesión                                    
                </Button>
                <div className="p-2 mt-3 flex flex-col gap-3">
                    <p className="text-center text-stone-700">Olvido la contraseña? <a href="#" className="text-teal-600 font-bold hover:text-teal-800 transition-colors">Restablecer</a></p>

                    <p className="text-center text-stone-700">No tienes cuenta? <Link to='/registerUser' className="text-sky-600 font-bold hover:text-sky-700 transition-colors">Registrarse</Link></p>
                </div>
            </Form>            
       </Main>
    );
};
export default Login;