import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../actions/systemActions'
import { mainService } from '../services/mainService'
import { googleResturantsService } from '../services/googleResturantsService'
import ResturantList from '../cmps/ResturantList'

function PlaceResturants() {
    const dispatch = useDispatch()
    const [place, setPlace] = useState(null)
    const [apiData, setApiData] = useState(null)
    const [resturants, setResturants] = useState([])
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        getPlace()
        if (place) getNearbyResturants()

    }, [place])

    async function getPlace() {
        const currPlace = await mainService.getById(id)
        setPlace(currPlace)
        console.log('currPlace is ,', currPlace)

    }
    async function getNearbyResturants(isLoadMore = false) {
        dispatch(setLoader())

        const { lat, lng } = place.position
        const currPagePosition = window.pageYOffset

        try {
            let newApiData = null
            if (!isLoadMore) {
                newApiData = await googleResturantsService.getResturantsFromGoogle(lat, lng)
            }
            else {
                console.log('apiData.next_page_token ', apiData.next_page_token)
                newApiData = await googleResturantsService.getResturantsFromGoogle(lat, lng, apiData.next_page_token)
            }
            setApiData(newApiData)
            setResturants(resturants.concat(newApiData.results))
            window.scrollTo(0, currPagePosition)
            dispatch(setLoader())
        }
        catch {
            console.log('basa')
        }
    }

    return (

        <section className="resturants-page">

            {(place && resturants.length) ?
                <React.Fragment>
                    <h1>Resturants near {place.title}</h1>
                    <ResturantList resturants={resturants} />
                </React.Fragment> : null
            }
            {(!place || (apiData && !apiData.results.length)) &&
                <React.Fragment>

                    <h1>OOPS! information is unavilable</h1>

                </React.Fragment>
            }
            {apiData && apiData.next_page_token &&
                <div className="btn-container full-width text-center">
                    <button onClick={() => getNearbyResturants(true)}>Show more</button>
                </div>
            }
        </section>
    )

}

export default PlaceResturants;