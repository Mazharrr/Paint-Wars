const initialState= {}

const RECIEVE_LAYER= 'RECIEVE_LAYER'

export const recieveLayer = layer => ({
  type: RECIEVE_LAYER,
  layer
})

export default (state = initialState , action)=>{
  switch(action.type){
    case RECIEVE_LAYER:
      return Object.assign({}, state, action.Classes.Layer)

      default: return state;
    }
}
