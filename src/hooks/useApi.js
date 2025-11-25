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

            const result = await response.json();
            console.log('Respuesta completa del backend:', result);

            // Manejar diferentes estructuras de respuesta
            let data;
            if (result.data) {
                data = result.data;
            } else if (result.proveedor && result.items) {
                data = result;
            } else {
                data = result;
            }

            // Normalizar los nombres de las propiedades a mayúsculas
            const normalizedData = normalizeData(data);
            console.log('Datos normalizados:', normalizedData);

            setLoading(false);
            return normalizedData;
        } catch (err) {
            console.error('Error en useApi:', err);
            const errorMessage = err.message || 'Error al conectar con el servidor';
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    // Función para normalizar nombres de propiedades
    const normalizeData = (data) => {
        if (!data) return data;

        return {
            proveedor: data.proveedor || 'Proveedor no especificado',
            formato_detectado: data.formato_detectado || 'Desconocido',
            total_items: data.total_items || 0,
            items: Array.isArray(data.items) ? data.items.map(normalizeItem) : []
        };
    };

    const normalizeItem = (item) => {
        if (!item) return {};

        // Mapear nombres en minúsculas a mayúsculas
        return {
            Item: item.Item || item.item || '',
            Referencia: item.Referencia || item.referencia || '',
            Descripcion: item.Descripcion || item.descripcion || '',
            Unid: item.Unid || item.unidad || item.Unidad || 'UN',
            Cant: item.Cant || item.cantidad || item.Cantidad || '0',
            V_Unit: item.V_Unit || item.v_unit || item.valor_unitario || '0',
            Valor_Total: item.Valor_Total || item.valor_total || '0'
        };
    };

    return { uploadPDF, loading, error };
};