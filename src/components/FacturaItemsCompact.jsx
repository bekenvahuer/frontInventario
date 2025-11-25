import React, { useState } from 'react';
import Icon from './Icon';
import { useApi } from '../hooks/useApi';

const FacturaUploader = () => {
    const [facturaData, setFacturaData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { uploadPDF, loading, error } = useApi();

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Por favor, selecciona un archivo PDF');
            return;
        }

        setSelectedFile(file);
        await handleSubmit(file);
    };

    const handleSubmit = async (file) => {
        if (!file) {
            alert('Por favor selecciona un archivo PDF');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const data = await uploadPDF(formData);
            console.log('Datos recibidos en componente:', data);

            // Validar estructura de datos
            if (!data) {
                throw new Error('No se recibieron datos del servidor');
            }

            // Asegurar que items sea un array
            const processedData = {
                proveedor: data.proveedor || 'Proveedor no especificado',
                formato_detectado: data.formato_detectado || 'Desconocido',
                total_items: data.total_items || (data.items ? data.items.length : 0),
                items: Array.isArray(data.items) ? data.items : []
            };

            console.log('Datos procesados para mostrar:', processedData);
            setFacturaData(processedData);
        } catch (err) {
            console.error('Error al procesar la respuesta:', err);
        }
    };

    const formatCurrency = (value) => {
        if (!value) return '$0.00';

        try {
            const num = parseFloat(value.toString().replace(',', '.'));
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 3
            }).format(num);
        } catch (e) {
            return '$0.00';
        }
    };

    const handlePlusClick = () => {
        document.getElementById('pdf-upload').click();
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid #374151'
            }}>
                <div style={{
                    fontWeight: 600,
                    color: '#f9fafb',
                    fontSize: '16px'
                }}>
                    Cargar Factura
                </div>

                <div
                    onClick={handlePlusClick}
                    style={{
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#374151';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <Icon path="res-react-dash-plus" />
                </div>

                <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={loading}
                />
            </div>

            {/* Estados de carga y error */}
            {loading && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    textAlign: 'center',
                    color: '#60a5fa',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderRadius: '8px',
                    fontSize: '14px'
                }}>
                    Procesando factura...
                </div>
            )}

            {error && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    color: '#f87171',
                    backgroundColor: 'rgba(248, 113, 113, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 113, 113, 0.3)',
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}

            {facturaData && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    gap: '12px'
                }}>
                    {/* Información del proveedor */}
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        borderRadius: '8px',
                        borderLeft: '2px solid #60a5fa'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#9ca3af',
                                    marginBottom: '2px',
                                    fontWeight: 500
                                }}>
                                    PROVEEDOR
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#f9fafb',
                                    lineHeight: '1.4'
                                }}>
                                    {facturaData.proveedor}
                                </div>
                            </div>

                            <div style={{
                                fontSize: '11px',
                                color: '#6b7280',
                                backgroundColor: 'rgba(75, 85, 99, 0.5)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: 500,
                                whiteSpace: 'nowrap'
                            }}>
                                {facturaData.formato_detectado}
                            </div>
                        </div>
                    </div>

                    {/* Lista de Items con Scroll Sutil */}
                    <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflowY: 'auto',
                            paddingRight: '4px'
                        }}>
                            {facturaData.items && facturaData.items.length > 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px'
                                }}>
                                    {facturaData.items.map((item, index) => (
                                        <div
                                            key={`${item.Item}-${index}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px 12px',
                                                backgroundColor: 'rgba(55, 65, 81, 0.3)',
                                                borderRadius: '6px',
                                                transition: 'all 0.2s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                                                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.3)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                            }}
                                        >
                                            {/* Número de Item */}
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: 'rgba(96, 165, 250, 0.2)',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                color: '#60a5fa',
                                                flexShrink: 0
                                            }}>
                                                {item.Item || index + 1}
                                            </div>

                                            {/* Referencia */}
                                            <div style={{
                                                marginLeft: '10px',
                                                fontWeight: 600,
                                                color: '#93c5fd',
                                                width: '70px',
                                                flexShrink: 0,
                                                fontSize: '11px',
                                                fontFamily: 'monospace'
                                            }}>
                                                {item.Referencia || 'N/A'}
                                            </div>

                                            {/* Descripción */}
                                            <div style={{
                                                marginLeft: '10px',
                                                color: '#e5e7eb',
                                                fontSize: '12px',
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                lineHeight: '1.3'
                                            }}>
                                                {item.Descripcion || 'Descripción no disponible'}
                                            </div>

                                            {/* Cantidad */}
                                            <div style={{
                                                marginLeft: '10px',
                                                fontSize: '11px',
                                                color: '#9ca3af',
                                                width: '40px',
                                                textAlign: 'center',
                                                flexShrink: 0,
                                                fontWeight: 500
                                            }}>
                                                {item.Cant || '0'}
                                            </div>

                                            {/* Valor Total */}
                                            <div style={{
                                                marginLeft: '10px',
                                                fontWeight: 600,
                                                color: '#34d399',
                                                width: '80px',
                                                textAlign: 'right',
                                                fontSize: '11px',
                                                flexShrink: 0,
                                                fontFamily: 'monospace'
                                            }}>
                                                {formatCurrency(item.Valor_Total)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    color: '#9ca3af',
                                    fontSize: '14px'
                                }}>
                                    No se encontraron items en la factura
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resumen */}
                    <div style={{
                        padding: '10px 12px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#d1d5db',
                        border: '1px solid rgba(75, 85, 99, 0.5)'
                    }}>
                        <div style={{ fontWeight: 500 }}>
                            Items: <span style={{ color: '#f9fafb', fontWeight: 600 }}>
                                {facturaData.total_items || 0}
                            </span>
                        </div>
                        <div style={{ fontWeight: 500 }}>
                            Total: <span style={{ color: '#34d399', fontWeight: 600 }}>
                                {formatCurrency(
                                    facturaData.items && Array.isArray(facturaData.items)
                                        ? facturaData.items.reduce((total, item) =>
                                            total + parseFloat((item.Valor_Total || 0).toString().replace(',', '.')), 0
                                        )
                                        : 0
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {!facturaData && !loading && !error && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#9ca3af',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px'
                    }}>
                        <Icon path="res-react-dash-plus" />
                    </div>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '4px'
                    }}>
                        Cargar Factura PDF
                    </div>
                    <div style={{
                        fontSize: '12px',
                        opacity: 0.7
                    }}>
                        Haz clic en el icono superior
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacturaUploader;