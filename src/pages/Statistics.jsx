import { AreaChart } from "recharts";
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
    
    if (!history) return <div>Loading...</div>
    return (
        <h1>Statistics</h1>
    )
}