//import game from '../states/stateManager'

const initialState = {
  crates: [],
  bombs: []
};

const RECIEVE_LAYER= 'RECIEVE_LAYER';
const REMOVE_PAINT= 'REMOVE_PAINT';
const ADD_FLAMES= 'ADD_FLAMES';
const REMOVE_FLAMES= 'REMOVE_FLAMES';
const LOAD_CRATES= 'LOAD_CRATES';
const REMOVE_CRATE= 'REMOVE_CRATE';
const ADD_PAINT= 'ADD_PAINT';
const ADD_PLAYER = "ADD_PLAYER"
const ADD_POWERUP = "ADD_POWERUP"
const REMOVE_POWERUP = "REMOVE_POWERUP"
const ADD_BOMB= "ADD_BOMB"
const REMOVE_BOMB = "REMOVE_BOMB"

export const addBomb = (x, y, bomb) =>({
  type: ADD_BOMB,
  payload: {x, y},
  bomb
})
export const removeBomb = (x, y) =>({
  type: REMOVE_BOMB,
  payload: {x, y}
})


export const addPowerUp = (x, y, powerUp) =>({
  type: ADD_POWERUP,
  powerXY: {x, y},
  powerUp
})
export const removePowerUp = (x, y) =>({
  type: REMOVE_POWERUP,
  payload: {x, y}
})

export const addPlayer = player =>({
  type: ADD_PLAYER,
  player
})

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
      newState.crates = action.crates
      break;
    case REMOVE_CRATE:
      newState.crates[action.payload.x][action.payload.y].crate = false;
      break;
    case ADD_PAINT:
      if(!(action.paint.key === newState.crates[action.payload.x][action.payload.y].paint.key )){
        if(newState.crates[action.payload.x][action.payload.y].paint) newState.crates[action.payload.x][action.payload.y].paint.kill()
          newState.crates[action.payload.x][action.payload.y]= Object.assign({}, newState.crates[action.payload.x][action.payload.y] , {paint: action.paint});
      }
      break;
    case ADD_FLAMES:
    if (typeof newState.crates[action.payload.x][action.payload.y].flame ==='object') newState.crates[action.payload.x][action.payload.y].flame.kill()
        newState.crates[action.payload.x][action.payload.y]= Object.assign({}, newState.crates[action.payload.x][action.payload.y] , {flame: action.flame});
        setTimeout(function(){
          if(newState.crates[action.payload.x][action.payload.y].flame) newState.crates[action.payload.x][action.payload.y].flame.kill();
          newState.crates[action.payload.x][action.payload.y].flame = false;
        }, 200)
      break;
    case ADD_POWERUP:
        newState.crates[action.powerXY.x][action.powerXY.y].powerUp = action.powerUp

        break;
    case REMOVE_POWERUP:
    if(newState.crates[action.payload.x][action.payload.y].powerUp){
        newState.crates[action.payload.x][action.payload.y].powerUp.kill()
        newState.crates[action.payload.x][action.payload.y].powerUp=false;
      }

        break;
    case ADD_BOMB:
    if(!newState.crates[action.payload.x][action.payload.y].bomb){ newState.crates[action.payload.x][action.payload.y].bomb = action.bomb
    newState.bombs.push(action.bomb)
    }
    break;
    case REMOVE_BOMB:
      newState.bombs = newState.bombs.filter(bomb=>  (bomb!==newState.crates[action.payload.x][action.payload.y].bomb) )
      if(newState.crates[action.payload.x][action.payload.y].bomb){
       newState.crates[action.payload.x][action.payload.y].bomb.sprite.kill()
      newState.crates[action.payload.x][action.payload.y].bomb= false
    }
    break;
    default:
      return state;
    }
    // console.log(newState)
  return newState;
}

export default reducer;
