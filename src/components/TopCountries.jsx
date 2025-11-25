import React from 'react'
import Icon from './Icon'


const Countrydata = [
    { name: 'USA', rise: true, value: 21942.83, id: 1 },
    { name: 'Ireland', rise: false, value: 19710.0, id: 2 },
    { name: 'Ukraine', rise: false, value: 12320.3, id: 3 },
    { name: 'Sweden', rise: true, value: 9725.0, id: 4 },
]


export default function TopCountries() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>Top Countries</div>
                <Icon path="res-react-dash-plus" />
            </div>
            <div style={{ marginTop: 8 }}>
                {Countrydata.map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
                        <div>{c.id}</div>
                        <img src={`https://assets.codepen.io/3685267/res-react-dash-flag-${c.id}.svg`} style={{ width: 28, height: 18, marginLeft: 8 }} />
                        <div style={{ marginLeft: 8 }}>{c.name}</div>
                        <div style={{ flex: 1 }} />
                        <div>{`$${c.value.toLocaleString()}`}</div>
                        <Icon path={c.rise ? 'res-react-dash-country-up' : 'res-react-dash-country-down'} />
                    </div>
                ))}
            </div>
        </div>
    )
}