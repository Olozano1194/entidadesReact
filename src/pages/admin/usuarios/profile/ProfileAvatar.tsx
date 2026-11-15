import { RiEdit2Line } from "react-icons/ri";

const DEFAULT_AVATAR =
    "https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulga-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg";

interface ProfileAvatarProps {
    avatarSrc?: string;
    defaultAvatar?: string;
    isEditing?: boolean;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    alt?: string;
    className?: string;
    imageClassName?: string;
}

export const ProfileAvatar = ({
    avatarSrc,
    defaultAvatar = DEFAULT_AVATAR,
    isEditing = false,
    onFileChange,
    alt = "Profile avatar",
    className = "",
    imageClassName = "h-32 w-32 rounded-lg border-4 border-white object-cover shadow-xl ring-emerald-100 md:h-40 md:w-40",
}: ProfileAvatarProps) => {
    return (
        <div className={`relative inline-block shrink-0 ${className}`}>
            <img
                src={avatarSrc || defaultAvatar}
                alt={alt}
                className={imageClassName}
                onError={(e) => {
                    e.currentTarget.src = defaultAvatar;
                }}
            />

            {isEditing && (
                <>
                    <label
                        htmlFor="profile-avatar-input"
                        className="absolute -top-2 -right-2 z-10 cursor-pointer rounded-full border-2 border-emerald-100 bg-surface-bright p-2 shadow-md hover:bg-emerald-50 active:scale-90"
                    >
                        <RiEdit2Line className="text-base text-emerald-900" />
                    </label>

                    <input
                        type="file"
                        name="fotoPerfil"
                        id="profile-avatar-input"
                        className="hidden"
                        accept="image/*"
                        onChange={onFileChange}
                    />
                </>
            )}
        </div>
    );
};

export default ProfileAvatar;
