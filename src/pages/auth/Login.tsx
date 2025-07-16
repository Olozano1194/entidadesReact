import { Link } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
//ui
import Main from '../../components/ui/Main';
import Form from "../../components/ui/Form";
import Title from "../../components/ui/Title";
import Span from "../../components/ui/Span";
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ErrorSpan from "../../components/ui/ErrorSpan";
//Icons
import { RiLoginBoxLine, RiMailFill, RiLockFill } from "react-icons/ri";
//img
import icons from '../../assets/favicon-32x32.png'

const Login = () => {
    const {  register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        
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
                    <Input type="password" placeholder="Write your password"
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
                    <RiLoginBoxLine className='text-purple-500 hover:text-purple-900'/>                    
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