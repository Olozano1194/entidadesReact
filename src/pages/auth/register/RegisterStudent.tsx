
//ui
import Main from '../../../components/ui/Main';
import Form from '../../../components/ui/Form';
import Title from "../../../components/ui/Title";
import Span from "../../../components/ui/Span";
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
//img
import icons from '../../../assets/favicon-32x32.png'
//icons
import { CiUser, CiMobile3, CiMail } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { RiLoginBoxLine } from "react-icons/ri";


const RegisterStudent = () => {
    return (
        <Main>
            <Form>
                <div className='w-full flex justify-center'>
                    <Title className="w-full font-bold flex justify-center items-center text-2xl p-4 md:text-3xl"><img className="w-8 h-6 rounded-lg pr-1" src={icons} alt="logo del desarrollador" />Crear <span className="pl-2 text-teal-800">Estudiante</span></Title>
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
                {/* date of birth */}                
                <label htmlFor="birthDate">
                    <Span><LiaBirthdayCakeSolid className='lg:text-2xl' />Fecha de cumpleaños</Span>
                    <Input type="date" placeholder="Write your Birth Date"
                        // {...register('birthDate',{
                        //     required: {
                        //         value: true,
                        //         message: 'Fecha de cumpleaños requerida'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Fecha de cumpleaños invalida'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.birthDate && <span className='text-red-500 pt-1.5 text-sm'>{errors.birthDate.message}</span>
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
                {/* Phone */}
                <label htmlFor="phone">
                    <Span><CiMobile3 className='lg:text-2xl' />Celular</Span>
                    <Input type="tel" placeholder="Escribe su celular"
                        // {...register('phone',{
                        //     required: {
                        //         value: true,
                        //         message: 'Celular requerido'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: Celular invalido'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.phone && <span className='text-red-500 pt-1.5 text-sm'>{errors.phone.message}</span>
                } */}
                {/* address */}
                <label htmlFor="address">
                    <Span><CiUser className='lg:text-2xl' />Dirección</Span>
                    <Input type="text" placeholder="Escribe la dirección"
                        // {...register('address',{
                        //     required: {
                        //         value: true,
                        //         message: 'Dirección requerida'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Dirección invalida'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.address && <span className='text-red-500 pt-1.5 text-sm'>{errors.address.message}</span>
                } */}
                {/* Groups */}
                <label htmlFor="groups">
                    <Span><CiUser className='lg:text-2xl' />Grupo</Span>
                    <Input type="text" placeholder="Escribe el grupo"
                        // {...register('groups',{
                        //     required: {
                        //         value: true,
                        //         message: 'Grupo requerido'
                        //         },
                        //         pattern: {
                        //             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //             message: 'Grupo invalido'
                        //         },
                        // })}  
                    />
                </label>
                {/* {
                    errors.groups && <span className='text-red-500 pt-1.5 text-sm'>{errors.groups.message}</span>
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
export default RegisterStudent;