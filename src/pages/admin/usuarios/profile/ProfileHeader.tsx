import { IoLocationOutline } from "react-icons/io5";
import type { AdminFormData } from "./hooks/useAdminProfile";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileHeaderProps {
    formData: AdminFormData;
    avatarSrc: string;
    defaultAvatar: string;
    editingUser: boolean;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    onSave: (e: React.FormEvent) => void;
    onEdit: () => void;
}

const ProfileHeader = ({
    formData, avatarSrc, defaultAvatar, editingUser,
    onFileChange, onReset, onSave, onEdit,
}: ProfileHeaderProps) => {
    return (
        <div className="flex flex-col gap-8 items-center mb-section-gap md:flex-row">
            <ProfileAvatar
                avatarSrc={avatarSrc}
                defaultAvatar={defaultAvatar}
                isEditing={editingUser}
                onFileChange={onFileChange}
            />
            <div className="text-center md:text-left">
                <h1 className="font-headline-lg mb-2 text-headline-lg text-on-surface">{formData?.nombre} {formData?.apellido}</h1>
                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                    <span className="bg-primary-container font-label-bold px-3 py-1 rounded-full text-on-primary-container text-label-bold">Super Administrador</span>
                    <span className="bg-secondary-container font-label-bold px-3 py-1 rounded-full text-on-secondary-container text-label-bold">Responsable Académico</span>
                    <span className="flex font-medium gap-1 items-center text-on-surface-variant text-sm">
                        <IoLocationOutline /> Campus Principal, Green Valey
                    </span>
                </div>
            </div>
            <div className="flex gap-3 md:ml-auto">
                {editingUser ? (
                    <>
                        <button className="border-2 border-primary cursor-pointer flex font-label-bold gap-2 items-center px-6 py-2.5 rounded-xl text-primary text-label-bold transition-all hover:bg-emerald-50 active:scale-95" onClick={onReset}>Cancelar</button>
                        <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-900/10 text-white text-label-bold transition-all hover:bg-emerald-800 active:scale-95" onClick={(e) => onSave(e as unknown as React.FormEvent)}>Guardar cambios</button>
                    </>
                ) : (
                    <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-900/10 text-white text-label-bold transition-all hover:bg-emerald-800 active:scale-95" onClick={onEdit}>Editar Perfil</button>
                )}
            </div>
        </div>
    );
};
export default ProfileHeader;