import ApiHandler from "../../../services/ApiHandler"
import {LOCATION_ERROR, LOCATION_LOADING, LOCATION_SUCCESS } from "../actionsType/actiontypes"

  
export const location = (url) => async (searchDispatch)=> {
    searchDispatch({
        type: LOCATION_LOADING,
        loading: true
    })
    try {
        const {data} = await ApiHandler.get(url)
        return searchDispatch({
            type: LOCATION_SUCCESS,
            loading: false,
            payload: data.data
        })
    } catch (error) {
        searchDispatch({
            type:LOCATION_ERROR,
            loading:false,
            payload :data
        })
    }
}