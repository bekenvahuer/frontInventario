import React, { useState } from 'react'
import MenuItem from './MenuItem'
import Icon from './Icon'


const sidebarItems = [
    [
        { id: '0', title: 'Dashboard', notifications: false },
        { id: '1', title: 'Overview', notifications: false },
        { id: '2', title: 'Chat', notifications: 6 },
        { id: '3', title: 'Team', notifications: false },
    ],
    [
        { id: '4', title: 'Tasks', notifications: false },
        { id: '5', title: 'Reports', notifications: false },
        { id: '6', title: 'Settings', notifications: false },
    ]
]


export default function Sidebar() {
    const [selected, setSelected] = useState('0')
    return (
        <aside className="sidebar">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon path="res-react-dash-logo" className="" />
                <div style={{ marginLeft: 8, fontWeight: 700, color: '#fff' }}>ClickCita</div>
            </div>


            <div style={{ marginTop: 16 }}>
                <div className="card" style={{ background: '#353535' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px 18px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        {/* Efecto de brillo sutil */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg,#8E76EF,#3912D2)',
                        }} />

                        <Icon
                            path="res-react-dash-sidebar-card"
                            style={{
                                width: '36px',
                                height: '36px',
                                filter: 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                            }}
                        />
                        <div style={{
                            marginLeft: '16px',
                            flex: 1
                        }}>
                            <div style={{
                                fontWeight: 800,
                                color: '#ffffff',
                                fontSize: '17px',
                                letterSpacing: '-0.3px',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                            }}>Canta Corazón</div>
                            <div style={{
                                color: '#8e76ef',
                                fontSize: '13px',
                                fontWeight: 600,
                                marginTop: '3px',
                                letterSpacing: '0.2px'
                            }}>Sistema de Inventario</div>
                        </div>
                        
                    </div>
                </div>


                <div style={{ marginTop: 12 }}>
                    {sidebarItems[0].map(i => <MenuItem key={i.id} item={i} onClick={setSelected} selected={selected} />)}
                </div>


                <div style={{ marginTop: 18, fontWeight: 700, color: '#fff' }}>SHORTCUTS</div>
                <div style={{ marginTop: 12 }}>
                    {sidebarItems[1].map(i => <MenuItem key={i.id} item={i} onClick={setSelected} selected={selected} />)}
                </div>
            </div>


            <div style={{ position: 'absolute', bottom: 12, width: '90%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`https://assets.codepen.io/3685267/mock_faces_8.jpg`} style={{ width: 40, height: 40, borderRadius: 999 }} />
                    <div style={{ marginLeft: 10, fontWeight: 700, color: '#fff' }}>Santiago Rey</div>
                    <div style={{ flex: 1 }} />
                    <Icon path="res-react-dash-options" />
                </div>
            </div>
        </aside>
    )
}