// import ApiHandler from "../../../services/ApiHandler"
import { ACTIVITY_LOADING, SWAP_ACTIVITY, ACTIVITY_ERROR} from "../actionsType/actiontypes"
export const swapAction = (data) => async (activityDispatch)=> {
    activityDispatch({
        type: ACTIVITY_LOADING,
        loading: true
    })
    try {
        activityDispatch({
                type: SWAP_ACTIVITY,
                loading: false,
                payload: data
            })
        }catch (error) {
            activityDispatch({
            type:ACTIVITY_ERROR,
            loading:false,
            payload :error
        })
        console.log('ggggggggg', error) 
    }
}