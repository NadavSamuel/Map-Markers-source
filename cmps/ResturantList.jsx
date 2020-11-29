import React from 'react';
import ResturantCard from '../cmps/ResturantCard'

function ResturantList({ resturants }) {
    console.log('resturants in list, ', resturants)
    return (
        <ul className="resturant-list clean-list column-layout">
            {resturants.map(resturant => {
                return <ResturantCard resturant={resturant} key={resturant.place_id} />
            })}

        </ul>
    );
}

export default ResturantList;