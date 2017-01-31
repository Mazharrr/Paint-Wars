const initialState = {
  crates: []
};

const RECIEVE_LAYER= 'RECIEVE_LAYER';
const LOAD_CRATES= 'LOAD_CRATES';
const REMOVE_CRATE= 'REMOVE_CRATE';
const ADD_PAINT= 'ADD_PAINT';

export const recieveLayer = layer => ({
  type: RECIEVE_LAYER,
  layer
})

export const loadCrates = crates => ({
  type: LOAD_CRATES,
  crates
})

export const addPaint = (x,y, paint) => ({
  type: ADD_PAINT,
  payload: {x, y},
  paint
})

export const removeCrate = (x,y) => ({
  type: REMOVE_CRATE,
  payload: {x, y}

})

const reducer = (state = initialState , action)=>{
  let newState = Object.assign({}, state)
  switch(action.type){
    case RECIEVE_LAYER:
      newState.layer = action.layer
      break
    case LOAD_CRATES:
      newState.crates = action.crates
      break
    case REMOVE_CRATE:
      //newState.crates = [[]]
      newState.crates[action.payload.x][action.payload.y] = undefined;
      break
    case ADD_PAINT:
    console.log( action.paint)
      newState.crates[action.payload.x][action.payload.y]= action.paint;
      break;
    default:
      return state;
    }
  return newState;
}

export default reducer;
