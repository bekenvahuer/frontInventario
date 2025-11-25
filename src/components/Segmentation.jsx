import React from 'react'
import Icon from './Icon'


const segmentationData = [
    { c1: 'Not Specified', c2: '800', c3: '#363636', color: '#535353' },
    { c1: 'Male', c2: '441', c3: '#818bb1', color: '#595f77' },
    { c1: 'Female', c2: '233', c3: '#2c365d', color: '#232942' },
    { c1: 'Other', c2: '126', c3: '#334ed8', color: '#2c3051' },
]


export default function Segmentation() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>Segmentation</div>
                <Icon path="res-react-dash-options" />
            </div>
            <div style={{ marginTop: 8 }}>
                {segmentationData.map(s => (
                    <div key={s.c1} style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: s.color }} />
                        <div style={{ marginLeft: 8 }}>{s.c1}</div>
                        <div style={{ flex: 1 }} />
                        <div>{s.c2}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}