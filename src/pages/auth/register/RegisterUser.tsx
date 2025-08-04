import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
//Mensajes
import { toast } from 'react-hot-toast';
//ui
import Main from '../../../components/ui/Main';
import Form from '../../../components/ui/Form';
import Title from '../../../components/ui/Title';
import Span from '../../../components/ui/Span';
import ErrorSpan from '../../../components/ui/ErrorSpan';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
//img
import icons from '../../../assets/favicon-32x32.png'
//icons
import { CiUser, CiMail } from "react-icons/ci";
import { RiLockPasswordLine, RiLoginBoxLine } from "react-icons/ri";
//Api
import { CreateUsers } from '../../../api/user.api';
import { getRoles } from '../../../api/roles.api';
//Model
import type { User } from '../../../model/user.model';
import type { CreateUserDto } from '../../../model/dto/user.dto';
import type { Rol } from '../../../model/rol.models';


const RegisterUser = () => {
    const { register, handleSubmit, formState: {errors}, watch, reset } = useForm<User>();
    const [ roles, setRoles ] = useState<Rol[]>([]);
    const navigate = useNavigate();

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
                nombre: data.nombre.trim(),
                apellido: data.apellido.trim(),
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
        <Main>
            <Form onSubmit={onSubmit}>
                <div className='w-full flex justify-center'>
                    <Title><img className="w-8 h-6 rounded-lg" src={icons} alt="logo del desarrollador" />Crear <span className="pl-2 text-teal-800">Usuario</span></Title>
                </div>                
                {/* name */}
                <label htmlFor="name">
                    <Span><CiUser className='lg:text-2xl' />Nombre</Span>
                    <Input type="text" placeholder="Escribe su nombre"
                        {...register('nombre',{
                            required: {
                                value: true,
                                message: 'Nombre requerido'
                                },
                                    minLength: {
                                            value: 4,
                                            message: 'El nombre debe tener minimo 4 carácteres'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'El nombre debe tener como máximo 20 carácteres'
                                        },
                                pattern: {
                                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)?$/,
                                    message: 'Nombre invalido'
                                },
                        })}  
                    />
                </label>
                {
                    errors.nombre && <ErrorSpan>{errors.nombre.message}</ErrorSpan>
                }
                {/* lastname */}
                <label htmlFor="lastname">
                    <Span><CiUser className='lg:text-2xl'/>Apellido</Span>
                    <Input type="text" placeholder="Escribe su apellido"
                        {...register('apellido',{
                            required: {
                                value: true,
                                message: 'Apellido requerido'
                                },
                            minLength: {
                                value: 4,
                                message: 'El apellido debe tener minimo 7 carácteres'
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)?$/,
                                message: 'Apellido invalido'
                            },
                        })}  
                    />
                </label>
                {
                    errors.apellido && <ErrorSpan>{errors.apellido.message}</ErrorSpan>
                }                
                {/* email */}
                <label htmlFor="email">
                    <Span><CiMail className='lg:text-2xl' />Correo</Span>
                    <Input type="email" placeholder="Escribe su correo"
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
                {/* Roles */}
                <label htmlFor="roles"><Span><CiUser/>Rol</Span>
                <Select
                    {...register('rol',{
                        required: {
                            value: true,
                            message: 'Rol requerido'
                        }                        
                    })}
                    // onChange={handleRolChange}
                >
                    <option value="">Seleccione un rol</option>
                    { roles.map(rol => (                    
                                                
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
                }
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
                {/* password */}
                <label htmlFor="password">
                    <Span><RiLockPasswordLine className='lg:text-2xl' />Contraseña</Span>
                    <Input type="password" placeholder="Escribe la contraseña"
                        {...register('password',{
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
                </label>
                {
                    errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>
                }
                {/* Repeat password */}
                <label htmlFor="repeatpassword">
                    <Span><RiLockPasswordLine className='lg:text-2xl' />Confirmar Contraseña</Span>
                    <Input type="password" placeholder="Repetir la contraseña"
                        {...register('repeatPassword',{
                            required: {
                                value: true,
                                message: 'confirmar Contraseña requerida'
                            },
                            validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
                        })}  
                    />
                </label>
                {
                    errors.repeatPassword && <ErrorSpan>{errors.repeatPassword.message}</ErrorSpan>
                }
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