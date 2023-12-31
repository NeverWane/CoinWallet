export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 500) {
    return new Promise(resolve => setTimeout(() => resolve(_query(entityType)), delay))
}

async function get(entityType, entityId, delay = 10) {
    const entities = await query(entityType, delay)
    const entity = entities.find(entity_1 => entity_1._id === entityId)
    return entity
}

async function post(entityType, newEntity, delay = 10) {
    newEntity = {...newEntity}
    newEntity._id = _makeId()
    const entities = await query(entityType, delay)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType, updatedEntity, delay = 10) {
    const entities = await query(entityType, delay)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType, entityId, delay = 10) {
    const entities = await query(entityType, delay)
    const idx = entities.findIndex(entity => entity._id === entityId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1)
    _save(entityType, entities)
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _query(entityType) {
    return JSON.parse(localStorage.getItem(entityType)) || []
}