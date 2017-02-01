const initialState = {
  crates: []
};

const RECIEVE_LAYER= 'RECIEVE_LAYER';
const REMOVE_PAINT= 'REMOVE_PAINT';
const ADD_FLAMES= 'ADD_FLAMES';
const REMOVE_FLAMES= 'REMOVE_FLAMES';
const LOAD_CRATES= 'LOAD_CRATES';
const REMOVE_CRATE= 'REMOVE_CRATE';
const ADD_PAINT= 'ADD_PAINT';

export const recieveLayer = layer => ({
  type: RECIEVE_LAYER,
  layer
})

export const removePaint = color => ({
  type: REMOVE_PAINT,
  color
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

export const addFlames = (x,y, flame) => ({
  type: ADD_FLAMES,
  payload: {x, y},
  flame
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
      break;
    case REMOVE_PAINT:
      for(let i  = 0; i < newState.crates.length; i++){
        for(let j  = 0; j < newState.crates[i].length; j++){
          if(newState.crates[i][j].paint && newState.crates[i][j].paint.key === action.color){
            newState.crates[i][j].paint.kill();
            newState.crates[i][j].paint = false;
          }
        }
      }
     break; 
    case LOAD_CRATES:
      newState.crateCount
      newState.crates = action.crates
      break;
    case REMOVE_CRATE:
      //newState.crates = [[]]
      newState.crates[action.payload.x][action.payload.y].crate = false;
      break;
    case ADD_PAINT:
      // if(newState.crates[action.payload.x][action.payload.y] === false)
      // newState.crates[action.payload.x][action.payload.y]= Object.assign({}, {crate: false} , {paint: action.paint});
      // else {
        newState.crates[action.payload.x][action.payload.y]= Object.assign({}, newState.crates[action.payload.x][action.payload.y] , {paint: action.paint});
      // }
      break;
    case ADD_FLAMES:
      // if(newState.crates[action.payload.x][action.payload.y] === false)
      // newState.crates[action.payload.x][action.payload.y]= Object.assign({}, {crate: false} , {paint: action.paint});
      // else {
        newState.crates[action.payload.x][action.payload.y]= Object.assign({}, newState.crates[action.payload.x][action.payload.y] , {flame: action.flame});
        console.log(newState)
        //its burning


        setTimeout(function(){
          newState.crates[action.payload.x][action.payload.y].flame.kill();
          newState.crates[action.payload.x][action.payload.y].flame = false;
          console.log('In timeout')
        }, 200)

      // }
      break;  
    default:
      return state;
    }
  return newState;
}

export default reducer;
