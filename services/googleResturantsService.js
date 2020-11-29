import axios from 'axios'
import {storageService} from '../services/storageService'
const KEY = 'AIzaSyARhJCj-KdXS-t0qh0QBlZLvhzJlyQ36EQ'


export const googleResturantsService = {
  getResturantsFromGoogle
}
async function getResturantsFromGoogle(lat, lang,nextPageToken = null) {
  try {

    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lang}&maxResults=10&radius=1500&type=restaurant&key=${KEY}`; 
    const loadMoreUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lang}&maxResults=10&radius=1500&type=restaurant&key=${KEY}&pagetoken=${nextPageToken}`;
    
    const resturants = !nextPageToken? await axios.get(proxyUrl + url): await axios.get(proxyUrl + loadMoreUrl)
    storageService.saveToStorage('resturants',resturants.data)

    return resturants.data
  }
  catch (err) {
    if (err.response) {
      // Request made and server responded
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
      console.log(err);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
  }
}
