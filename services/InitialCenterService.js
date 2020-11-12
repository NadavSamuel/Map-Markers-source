import { storageService } from './storageService.js'

export const initialCenterService  =  {
    saveInitialCenter,
    loadInitialCenter
}

const STORAGE_KEY = 'initial-center'

function saveInitialCenter(position){
    storageService.saveToStorage(STORAGE_KEY,position)
}
function loadInitialCenter(){
    return storageService.loadFromStorage(STORAGE_KEY)
}
