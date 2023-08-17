export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    padNum,
    getDayName,
    getMonthName,
    getSeason,
    getRandomSeason,
    getCurrTime
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getDayName(date = new Date(), locale) {
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[date.getMonth()]
}

const seasonArray = [
    { name: 'Spring', date: new Date(2023, 2, 21).getTime() },
    { name: 'Summer', date: new Date(2023, 5, 21).getTime() },
    { name: 'Autumn', date: new Date(2023, 8, 23).getTime() },
    { name: 'Winter', date: new Date(2023, 11, 21).getTime() }
]

function getSeason(timeStamp = Date.now()) {
    const season = seasonArray.filter(({ date }) => date <= timeStamp).slice(-1)[0] || {name: "Winter"}
    return season.name
}

function getRandomSeason() {
    return seasonArray[getRandomIntInclusive(0, 3)].name
}

function getCurrTime() {
    return new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' })
}