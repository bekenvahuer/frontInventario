import React from 'react'
import Icon from './Icon'


function Image({ path, className }) {
    const src = `https://assets.codepen.io/3685267/${path}.jpg`
    return <img src={src} alt="" className={className} style={{ borderRadius: 999 }} />
}


export default function NameCard({ name, position, transactions, rise, tasksCompleted, imgId }) {
    const transactionsText = typeof transactions === 'number' ? `$${transactions.toFixed(2)}` : transactions
    return (
        <div style={{ width: '100%', padding: 8 }}>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: 12, height: 150 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image path={`mock_faces_${imgId}`} className="w-10 h-10" />
                        <div style={{ marginLeft: 8 }}>
                            <div style={{ fontWeight: 700, color: '#fff' }}>{name}</div>
                            <div className="text-sm">{position}</div>
                        </div>
                    </div>
                    <div className="text-sm" style={{ marginTop: 8 }}>{`${tasksCompleted} de 5 tareas completadas`}</div>
                    <div style={{ marginTop: 12, width: 220 }}>
                        <div style={{ background: '#2D2D2D', height: 6, borderRadius: 3 }}>
                            <div style={{ height: 6, borderRadius: 3, width: `${(tasksCompleted / 5) * 100}%`, background: 'linear-gradient(90deg,#8E76EF,#3912D2)' }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon path={rise ? 'res-react-dash-bull' : 'res-react-dash-bear'} />
                    <div style={{ fontWeight: 700, color: rise ? '#22c55e' : '#ef4444', marginTop: 8 }}>{transactionsText}</div>
                    <div className="text-sm">últimos 6 meses</div>
                </div>
            </div>
        </div>
    )
}