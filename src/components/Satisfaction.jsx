import React from 'react'
import Icon from './Icon'


export default function Satisfaction() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>Satisfication</div>
                <Icon path="res-react-dash-options" />
            </div>
            <div style={{ marginTop: 8 }}>From all projects</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <svg viewBox="0 0 700 380" fill="none" width="300" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2d2d2d" strokeWidth="40" strokeLinecap="round" />
                    <path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2f49d0" strokeWidth="40" strokeLinecap="round" strokeDasharray="785.4" strokeDashoffset="78.54" />
                </svg>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
                <div style={{ fontWeight: 700, color: '#2f49d1', fontSize: 18 }}>97.78%</div>
                <div>Based on Likes</div>
            </div>
        </div>
    )
}