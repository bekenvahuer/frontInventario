import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import NameCard from './components/NameCard'
import Graph from './components/Graph'
import TopCountries from './components/TopCountries'
import FacturaItemsCompact from './components/FacturaItemsCompact'
import Segmentation from './components/Segmentation'
import Satisfaction from './components/Satisfaction'
import AddComponent from './components/AddComponent'

const employeeData = [
    { id: 1, name: 'Esther Howard', position: "Servicio Canta Corazón", transactions: 3490, rise: true, tasksCompleted: 3, imgId: 0 },
    { id: 2, name: 'Eleanor Pena', position: "Servicio Canta Corazón", transactions: 590, rise: false, tasksCompleted: 5, imgId: 2 },
    { id: 3, name: 'Robert Fox', position: "Servicio Canta Corazón", transactions: 2600, rise: true, tasksCompleted: 1, imgId: 3 },
]

const getCurrentDate = () => {
    const now = new Date();
    const options = {
        month: 'long',
        day: 'numeric'
    };

    // Formato en español
    const formatter = new Intl.DateTimeFormat('es-ES', options);
    let formatted = formatter.format(now);

    // Capitalizar el mes
    formatted = formatted.replace(/\b\w/g, l => l.toUpperCase());
    return formatted;
}

export default function App() {
    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    // Actualizar la fecha cada día (opcional)
    useEffect(() => {
        const updateDate = () => {
            setCurrentDate(getCurrentDate());
        };

        // Actualizar a medianoche
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight - now;

        const timeoutId = setTimeout(() => {
            updateDate();
            // Actualizar cada 24 horas
            setInterval(updateDate, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="app-shell">
            <Sidebar />
            <main className="content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>Hola Santiago</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
                            <img src={`https://assets.codepen.io/3685267/res-react-dash-date-indicator.svg`} style={{ width: 18, height: 18 }} />
                            <div style={{ marginLeft: 8 }}>{currentDate}</div>
                        </div>
                    </div>
                    <div style={{ width: 280 }}>
                        <input placeholder="search" />
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 12 }}>
                    {employeeData.map(e => <NameCard key={e.id} {...e} />)}

                    <div style={{ width: '100%', padding: 8 }}>
                        <div className="card" style={{ height: 400 }}>
                            <FacturaItemsCompact />
                        </div>
                    </div>

                    <div style={{ width: '100%', padding: 8 }}>
                        <div className="card" style={{ height: 460 }}>
                            <Graph />
                        </div>
                    </div>

                    <div style={{ width: '33%', padding: 8 }}>
                        <div className="card" style={{ height: 500 }}>
                            <Segmentation />
                        </div>
                    </div>

                    <div style={{ width: '33%', padding: 8 }}>
                        <div className="card" style={{ height: 500 }}>
                            <Satisfaction />
                        </div>
                    </div>

                    <div style={{ width: '33%', padding: 8 }}>
                        <div className="card" style={{ height: 500 }}>
                            <AddComponent />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}