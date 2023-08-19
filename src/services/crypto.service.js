import { storageService } from "./async-storage.service"

const CURRENCY_KEY = 'currencyKey'
const dayMilli = 1000 * 60 * 60 * 24

export const cryptoService = {
    // getRate,
    getRateHistory,
}

async function getRateHistory(days = 0, toCurrency = 'BTC', fromCurrency = 'USD') {
    try {
        const history = await storageService.query(CURRENCY_KEY, 0) || []
        let currency = history.find(currency => currency.name === toCurrency)
        if (!currency) {
            currency = await storageService.post(CURRENCY_KEY, { name: toCurrency, values: {} })
        }
        if (!upToDate(currency.values[fromCurrency])) {
            let values = await fetchRate()
            currency.values[fromCurrency] = { ...currency.values[fromCurrency], ...values }
            currency.values[fromCurrency] = (Array.from(Object.entries(currency.values[fromCurrency]))).sort((object1, object2) => object1[0] - object2[0])
            currency.values[fromCurrency] = Object.fromEntries(currency.values[fromCurrency])
        }
        let values = (await storageService.put(CURRENCY_KEY, currency)).values[fromCurrency]
        if (days > 0) {
            values = Array.from(Object.entries(values))
            values = values.splice(values.length - days, days)
            values = Object.fromEntries(values)
        }
        return toObjectArray(values)
    } catch (err) {
        throw err
    }
}

function toObjectArray(values) {
    const objectArray = []
    for (const key in values) {
        objectArray.push({ date: key, value: values[key] })
    }
    return objectArray
}

async function fetchRate() {
    const values = (await (await fetch(`https://api.blockchain.info/charts/market-price?timespan=3years&rollingAverage=1days&format=json&cors=true`)).json()).values
    return values.reduce((acc, value) => {
        acc[value.x * 1000] = value.y
        return acc
    }, {})
}

function upToDate(values) {
    if (!values) return false
    const maxTimeStamp = Math.max(...Object.keys(values))
    const date = new Date()
    return ((date.getTime() - maxTimeStamp < dayMilli &&
        date.getDate() === (new Date(maxTimeStamp).getDate())))
}