import React from 'react'
import Icon from './Icon'


export default function AddComponent() {
    return (
        <div>
            <div style={{ height: 80, background: '#181818', borderRadius: 12 }} />
            <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(-40px)', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: '#414455', width: 80, height: 80, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`https://assets.codepen.io/3685267/res-react-dash-rocket.svg`} alt="" style={{ width: '60%', height: '60%' }} />
                </div>
                <div style={{ color: '#fff', fontWeight: 700, marginTop: 12 }}>Aún no se han creado componentes</div>
                <div style={{ marginTop: 8 }}>Simplemente crea tu primer componente</div>
            </div>
        </div>
    )
}