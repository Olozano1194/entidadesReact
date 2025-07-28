//icons
import { RiShieldCheckLine } from "react-icons/ri";

//Api
import { getUserProfile } from "../../../../api/user.api";

//hooks
import { useState, useEffect } from "react";


function UserPass() {
    const [user, setUser] = useState({ email: ''});

    useEffect(() => {
        const axiosUserData = async () => {
            try {
                const data = await getUserProfile();
                setUser({
                    email: data.user.email,                    
                });
            }catch (error) {
                console.error(error);
            }
        };
        axiosUserData();
    }, []);

    return (
        <>
             {/* Usuario y contraseña */}
        <section className="bg-primary p-8 rounded-xl mt-10">
            <h1 className="text-xl text-white font-bold md:text-2xl">Usuario y Contraseña</h1>
            <hr className="my-8 border-gray-500" />

            <form action="">
                {/* Email */}
                <section className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div className="mb-4">
                        <h5 className="text-white font-semibold text-xl">Corre Electrónico</h5>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                        <button className="py-2 px-4 rounded-lg bg-sky-700 cursor-pointer font-bold text-white hover:bg-sky-500 hover:scale-105 transition-colors" >Cambiar Correo</button>
                </section>

                {/* Contraseña */}
                <section className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div className="mb-3">
                        <h5 className="text-white font-semibold text-xl">Contraseña</h5>
                        <p className="text-gray-400 text-sm">***************</p>
                    </div>
                        <button className="py-2 px-4 rounded-lg bg-sky-700 cursor-pointer font-bold text-white hover:bg-sky-500 hover:scale-105 transition-colors" >Cambiar Contraseña</button>
                </section>
            </form>

            <article className="grid grid-cols-1 items-center gap-y-4 md:grid-cols-8 bg-blue-400/10 p-4 rounded-lg border border-dashed border-sky-400 ">
                <div className="flex justify-center">
                    <RiShieldCheckLine className="text-4xl text-sky-400" />
                </div>

                <div className="px-4 md:col-span-6">
                    <h4 className="font-bold text-white text-xl sm:text-base mb-2">Secure Your Account</h4>
                    <p className="text-white text-xl md:text-sm md: ">Two-factor authentication adds an extra layer od security to your account.To log in, in addition you'll need to provide a 6 digit code</p>
                </div>

                <div className="flex md:justify-end justify-center">
                    <button className="bg-sky-700 cursor-pointer py-2 px-3
                    rounded-lg text-white hover:bg-sky-500 transition-colors">Activar</button>
                </div>
            </article>
        </section>
        </>
    );
}
export default UserPass;