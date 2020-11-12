import { storageService } from './storageService.js'

export const mainService  =  {
    query,
    save,
    remove,
    getById,
    makeId,
}

var defaultItems = [
    {position:{lat: 37.7873304289299, lng: -122.43072017185777},title:'Some place', _id: "5PLfm",description:'Ahlan wa sahalan'},
    {position:{lat: 32.7873304289299, lng: -112.43072017185777},title:'Some other place', _id: "43fag",description:'Ahlan wa sahalan ya gever'},
]

const STORAGE_KEY = 'places'
const gPlaces = _loadPlaces()

function query(filterBy) {
    let placesToReturn = gPlaces;
    if (filterBy) {
        var { title } = filterBy
        placesToReturn = gPlaces.filter(place => place.title.toLowerCase().includes(title.toLowerCase()))
    }
    return Promise.resolve([...placesToReturn]);
}

function getById(id) {
    const place = gPlaces.find(place => place._id === id)
    return Promise.resolve(place)
}

function remove(id) {
    const idx = gPlaces.findIndex(place => place._id === id)
    gPlaces.splice(idx, 1)
    storageService.saveToStorage(STORAGE_KEY, gPlaces)
    return Promise.resolve()
}

function save(placeToSave) {
    if (placeToSave._id) {
        const idx = gPlaces.findIndex(item => item._id === placeToSave._id)
        gPlaces.splice(idx, 1, placeToSave)
    } else {
        placeToSave._id = makeId()
        gPlaces.push(placeToSave)
    }
    storageService.saveToStorage(STORAGE_KEY, gPlaces)
    return Promise.resolve(placeToSave);
}

function _loadPlaces() {
    let items = storageService.loadFromStorage(STORAGE_KEY)
    if (!items || !items.length) items = defaultItems
    storageService.saveToStorage(STORAGE_KEY, items)
    return items
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
