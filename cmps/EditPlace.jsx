import React from 'react';
import { useForm } from '../services/customHooks'


export function EditPlace(props) {
    const { toggleIsEdit, place } = props
    const [placeToEdit, handleChange] = useForm({ ...place })
    return (
        <React.Fragment>
            <form onSubmit={(event) => toggleIsEdit(event, placeToEdit)} className="place-edit-form ">
                    <label htmlFor="title">Title: </label>
                    <input name="title" type="text" value={placeToEdit.title} onChange={handleChange} />
                <label htmlFor="Description">Description: </label>
                <textarea name="description" id="" cols="30" rows="10" value={placeToEdit.description} onChange={handleChange}></textarea>
                <button >Edit </button>
            </form>
        </React.Fragment>


    );
}

