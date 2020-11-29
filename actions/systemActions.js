import { Store } from "@material-ui/icons";
import systemReducer from "../reducers/systemReducer";

export const _loading = () =>  ({ type: 'LOADING_START' })
export const _doneLoading = () => ({ type: 'LOADING_DONE' })

export function setLoader() {
    return  (dispatch,getState) => {
        const {isLoading} = getState().systemReducer
        !isLoading ? dispatch(_loading()) : dispatch(_doneLoading()) 
    }
}

