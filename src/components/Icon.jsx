import React from 'react';

const localIcons = {
    'canta': '/Canta.webp',
    'sidebar-card': '/Canta.webp',        // Nuevo ícono personalizado
    'res-react-dash-sidebar-card': '/Canta.webp', // Sobrescribe el original
    // puedes agregar más imágenes locales aquí
};

export default function Icon({ path = 'res-react-dash-options', className = '', alt = '' }) {
    // Verificar si es una imagen local
    if (localIcons[path]) {
        return <img src={localIcons[path]} alt={alt} className={className} />;
    }

    // Si no, usa las imágenes de CodePen
    const src = `https://assets.codepen.io/3685267/${path}.svg`;
    return <img src={src} alt={alt} className={className} />;
}