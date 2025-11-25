import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Icon from './Icon'


const graphData = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'].map(i => ({ name: i, revenue: 500 + Math.random() * 2000, expectedRevenue: Math.max(500 + Math.random() * 2000 + (Math.random() - 0.5) * 2000, 0) }))


export default function Graph() {
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload) return null
        return (
            <div style={{ background: '#1d1d1d', color: '#fff', padding: 8, borderRadius: 8 }}>
                <div style={{ fontWeight: 700 }}>${payload[0].value.toFixed(2)}</div>
                <div>Revenue</div>
            </div>
        )
    }


    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>Your Work Summary</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon path="res-react-dash-graph-range" />
                    <div style={{ marginLeft: 8 }}>Last 9 Months</div>
                </div>
            </div>
            <div style={{ height: 260, marginTop: 12 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                        <CartesianGrid horizontal={false} stroke="#252525" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Line type="monotone" dataKey="expectedRevenue" stroke="#242424" strokeWidth={3} dot={false} strokeDasharray="8 8" />
                        <Line type="monotone" dataKey="revenue" stroke="#6B8DE3" strokeWidth={4} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}