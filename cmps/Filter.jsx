import React from 'react';
import { useForm } from '../services/customHooks'
import { useDispatch,  } from 'react-redux'
import { setFilter } from '../actions/placeActions.js';

export function Filter() {
    
    const dispatch = useDispatch()

    const [filterBy, handleChange] = useForm({ title: ''},onFilter)
    const { title } = filterBy
                function onFilter() {
                    if(filterBy === undefined) return
                    dispatch(setFilter(filterBy))
                }
        return (
            <div className="places-filter-container">
                <input autoComplete="off" name="title" type="text" value={title} onChange={handleChange} placeholder="Search for a place" />
            </div>
        );
    }

