import React from 'react'
import Icon from './Icon'


export default function MenuItem({ item, onClick, selected }) {
    const { id, title, notifications } = item
    return (
        <div onClick={() => onClick(id)} className={"menu-item"} style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderRight: selected === id ? '2px solid #fff' : '2px solid transparent' }}>
            <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="28" height="28">
                    <circle cx="12" cy="12" r="10" fill="#2d2d2d" />
                </svg>
            </div>
            <div style={{ marginLeft: 8, color: selected === id ? '#fff' : undefined }}>{title}</div>
            <div style={{ flex: 1 }} />
            {notifications && <div style={{ background: '#ff5c8a', color: '#fff', width: 22, height: 22, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications}</div>}
        </div>
    )
}