// hooks/useApi.js
import { useState } from 'react';

const API_BASE_URL = 'https://backinventario.onrender.com';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadPDF = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Enviando PDF al backend...');

            const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
                method: 'POST',
                body: formData,
            });

            console.log('Respuesta recibida:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Datos recibidos del backend:', data);

            setLoading(false);
            return data;
        } catch (err) {
            console.error('Error en useApi:', err);
            const errorMessage = err.message || 'Error al conectar con el servidor';
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    return { uploadPDF, loading, error };
};