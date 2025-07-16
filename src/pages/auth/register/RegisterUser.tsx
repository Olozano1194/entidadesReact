
//ui
import Main from '../../../components/ui/Main';
import Form from '../../../components/ui/Form';
import Title from '../../../components/ui/Title';
import Span from '../../../components/ui/Span';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
//img
import icons from '../../../assets/favicon-32x32.png'
//icons
import { CiUser, CiMail } from "react-icons/ci";
import { RiLockPasswordLine, RiLoginBoxLine } from "react-icons/ri";



const RegisterUser = () => {
    return (
        <Main>
            <Form>
                <div className='w-full flex justify-center'>
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />Crear <span className="pl-2 text-teal-800">Usuario</span></Title>
                </div>                
                {/* name */}
                <label htmlFor="name">
                    <Span><CiUser className='lg:text-2xl' />Nombre</Span>
                    <Input type="text" placeholder="Escribe su nombre"
                        // {...register('name',{
                        //     required: {
                        //         value: true,
                        //         message: 'Nombre requerido'
                        //         },
                                    // minLength: {
                                    //         value: 4,
                                    //         message: 'El nombre debe tener minimo 4 carácteres'
                                    //     },
                                    //     maxLength: {
                                    //         value: 20,
                                    //         message: 'El nombre debe tener como máximo 20 carácteres'
                                    //     },
                        //         pattern: {
                        //             value: /^[a-zA-Z]+$/,
                        //             message: 'Nombre invalido'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.name && <span className='text-red-500 pt-1.5 text-sm'>{errors.name.message}</span>
                } */}
                {/* lastname */}
                <label htmlFor="lastname">
                    <Span><CiUser className='lg:text-2xl'/>Apellido</Span>
                    <Input type="text" placeholder="Escribe su apellido"
                        // {...register('lastname',{
                        //     required: {
                        //         value: true,
                        //         message: 'Apellido requerido'
                        //         },
                        // minLength: {
                                    //         value: 4,
                                    //         message: 'El apellido debe tener minimo 7 carácteres'
                        //         pattern: {
                        //             value: /^[a-zA-Z]{2,}+$/,
                        //             message: 'Apellido invalido'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.lastname && <span className='text-red-500 pt-1.5 text-sm'>{errors.lastname.message}</span>
                } */}                
                {/* email */}
                <label htmlFor="email">
                    <Span><CiMail className='lg:text-2xl' />Correo</Span>
                    <Input type="email" placeholder="Escribe su correo"
                        // {...register('email',{
                        //     required: {
                        //         value: true,
                        //         message: 'Correo requerido'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Correo invalido'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.email && <span className='text-red-500 pt-1.5 text-sm'>{errors.email.message}</span>
                } */}                
                {/* password */}
                <label htmlFor="password">
                    <Span><RiLockPasswordLine className='lg:text-2xl' />Contraseña</Span>
                    <Input type="password" placeholder="Escribe la contraseña"
                        // {...register('password',{
                        //     required: {
                        //         value: true,
                        //         message: 'Contraseña requerida'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Contraseña invalida'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.password && <span className='text-red-500 pt-1.5 text-sm'>{errors.password.message}</span>
                } */}
                {/* Repeat password */}
                <label htmlFor="repeatpassword">
                    <Span><RiLockPasswordLine className='lg:text-2xl' />Repetir Contraseña</Span>
                    <Input type="password" placeholder="Escribe la contraseña"
                        // {...register('repeatpassword',{
                        //     required: {
                        //         value: true,
                        //         message: 'Repetir Contraseña requerida'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Contraseña invalida'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.repeatPassword && <span className='text-red-500 pt-1.5 text-sm'>{errors.repeatPassword.message}</span>
                } */}
                {/* Btn */}
                <Button type="submit">
                    <RiLoginBoxLine className='text-purple-500 hover:text-purple-900'/>                    
                        Registrar                                   
                </Button>
            </Form>
        </Main>
    );
};
export default RegisterUser;