import { useState } from "react";
import React from "react";
//icons
import { RiNotification3Line, RiCloseLine, RiInformationLine, RiCheckLine, RiInboxLine } from 'react-icons/ri';
//Enlaces
import { Link } from "react-router-dom";
//react-menu
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

type NotificationType = 'warning' | 'danger' | 'success' | 'info';

interface Notification {
    title: string;
    message: string;
    date: string;
    type: NotificationType;
    link: string;
}

const NotificationMenu = () => {
    //notificaciones (sin API de notificaciones por ahora)
    const [notifications] = useState<Notification[]>([]);
    const [count, setCount] = useState(0);

    //Marcar todas como leídas
    const markAllAsRead = () => {
        setCount(0);
    };

    //Obtener icono según el tipo de notificación
    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'warning':
                return <RiInformationLine className="p-2 bg-yellow-100 text-yellow-600 box-content rounded-full" />;
            case 'danger':
                return <RiCloseLine className="p-2 bg-red-100 text-red-600 box-content rounded-full" />;
            case 'success':
                return <RiCheckLine className="p-2 bg-green-100 text-green-600 box-content rounded-full" />;
            default:
                return <RiInformationLine className="p-2 bg-blue-100 text-blue-600 box-content rounded-full" />;
        }
    };

    return (
    <Menu>
        <MenuButton className="relative cursor-pointer p-2 rounded-lg transition-colors text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white">
            <RiNotification3Line className="text-2xl" />
            {count > 0 && (
            <span className="absolute -top-0.5 right-0 bg-emerald-500 py-0.5 px-[5px] box-content text-white rounded-full text-[8px] font-bold">
                {count}
            </span>
            )}
        </MenuButton> 
        <MenuItems anchor='bottom end' className='bg-emerald-950 border border-emerald-900 mt-1 p-4 rounded-xl max-h-[70vh] overflow-y-auto w-80 shadow-2xl'>
            <div className="flex justify-between items-center mb-2">
            <h1 className="text-white font-semibold">Notificaciones</h1>
            {count > 0 && (
                <button 
                    onClick={markAllAsRead}
                    className="text-sm text-emerald-400 hover:underline"
                >
                Marcar como leídas
                </button>
            )}
            </div>
            <hr className="my-3 border-emerald-900" />
            {notifications.length === 0 ? (
            <div className="text-center py-4">
                <RiInboxLine className="mx-auto text-3xl text-emerald-400/60 mb-2" />
                <p className="text-emerald-100/60">No hay notificaciones</p>
            </div>
            ) : (
            notifications.map((notification, index) => (
                <React.Fragment key={index}>
                <MenuItem as='div' className='p-0 hover:bg-emerald-800/40 rounded-lg'>
                    <Link 
                        to={notification.link}
                        className="flex flex-1 items-start gap-x-3 py-2 px-4 transition-colors rounded-lg text-emerald-100/80"
                    >
                    {getNotificationIcon(notification.type)}
                    <div className="text-sm flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <span className="font-medium text-white">{notification.title}</span>
                            <span className="text-xs text-emerald-400/60">{notification.date}</span>
                        </div>
                        <p className="text-emerald-100/60 mt-1">{notification.message}</p>
                    </div>
                    </Link>
                </MenuItem>
                {index < notifications.length - 1 && <hr className="my-3 border-emerald-900" />}
                </React.Fragment>
            ))
            )}
            <hr className="my-3 border-emerald-900" />
            <MenuItem as='div' className='p-0 flex justify-center cursor-default'>
            <Link 
                to="/notifications" 
                className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors font-medium"
            >
                Ver todas las notificaciones
            </Link>
            </MenuItem>
        </MenuItems>                   
    </Menu>
  );
}
export default NotificationMenu;