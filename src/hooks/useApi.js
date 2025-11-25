// hooks/useApi.js (versión simplificada)
import { useState } from 'react';

const API_BASE_URL = 'https://backinventario.onrender.com';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadPDF = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            // Extraer los datos de la propiedad 'data' o usar el objeto completo
            const data = result.data || result;

            setLoading(false);
            return data;
        } catch (err) {
            const errorMessage = err.message || 'Error al conectar con el servidor';
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    return { uploadPDF, loading, error };
};