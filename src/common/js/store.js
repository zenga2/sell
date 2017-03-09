var storeKey = '__seller__'

export function saveToLocal(id, key, val) {
    let seller = window.localStorage[storeKey]
    if (!seller) {
        seller = {}
        seller[id] = {}
    } else {
        seller = JSON.parse(seller)
        if (!seller[id]) {
            seller[id] = {}
        }
    }

    seller[id][key] = val
    window.localStorage[storeKey] = JSON.stringify(seller)
    console.log('saveToLocal')
    console.log(seller)
}

export function loadFromLocal(id, key, def) {
    let seller = window.localStorage[storeKey]
    console.log('loadFromLocal')
    console.log(seller)
    if (!seller) {
        return def
    }
    seller = JSON.parse(seller)[id]
    if (!seller) {
        return def
    }
    let ret = seller[key]
    return ret || def
}
