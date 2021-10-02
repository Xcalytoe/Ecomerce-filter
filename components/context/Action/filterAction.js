import { FILTER_ERROR, FILTER_LOADING, FILTER_SUCCESS } from "../actionsType/actiontypes"

export const filter = (myData) => async (productDispatch)=> {
    console.log("myyyyyyy",myData)
    productDispatch({
        type: FILTER_LOADING,
        loading: true
    })
    try {
        setTimeout(() => console.log("hhdhchhdc", myData), 4000)
    } catch (error) {
        console.log(error)
    }
   
   
}
