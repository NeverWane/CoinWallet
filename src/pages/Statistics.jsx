import { Area, AreaChart, CartesianAxis, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cryptoService } from "../services/crypto.service";
import { useEffect, useState } from "react";
export default function Statistics() {
    const [history, setHistory] = useState()

    useEffect(() => {
        getRateHistory()
    }, [])

    async function getRateHistory(days = 180) {
        let history = await cryptoService.getRateHistory(days)
        setHistory(history)
    }

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    function formatValue(value, name = 'date') {
        return name === 'date' ? new Date(+value).toLocaleDateString() : value.toLocaleString()
    }


    if (!history) return <div>Loading...</div>
    return (
        <section className="page-stats">
            <h1>Statistics</h1>
            <section className="chart-container">
                <ResponsiveContainer>
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                        <XAxis tickCount={7} dataKey="date" type="number" domain={['data-min', 'data-max']} tickFormatter={(date) => formatValue(date)} />
                        <YAxis dataKey="value" tickFormatter={(value) => formatValue(value, 'num')} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value, name) => formatValue(value, name)} labelFormatter={(date) => formatValue(date)} />
                        <Area type="monotone" dataKey="date" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
        </section>
    )
}