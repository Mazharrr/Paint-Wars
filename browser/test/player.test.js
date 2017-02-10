import playerReducer, {
  //action creators
  setId,
  addPlayerN,
  addAvatar,
  increaseScore,
  addToPlayerPowerUp,
  killPlayer,
  addPlayerName,
  //action types
  ADD_PLAYER_NAME,
  ADD_AVATAR,
  INCREASE_SCORE,
  ADD_POWER_UP,
  KILL_PLAYER,
  SET_LOBBY_ID,
  //reducer
  reducer
} from '../reducers/Player';

describe('Player actions', () => {
  it ('should create an action that adds a lobby id', () => {
    const id = 1
    const expectedAction = {
      type: SET_LOBBY_ID,
      id
    }
    expect(setId(id)).toEqual(expectedAction)
  })

  it ('should create an action that adds a player name', () => {
    const name = "James"
    const expectedAction = {
      type: ADD_PLAYER_NAME,
      name
    }
    expect(addPlayerN(name)).toEqual(expectedAction)
  })

  it ('should create an action that adds a player avatar', () => {
    const imageURL = "www.fillmurray.com/100/100"
    const expectedAction = {
      type: ADD_AVATAR,
      imageURL
    }
    expect(addAvatar(imageURL)).toEqual(expectedAction)
  })

  it ('should create an action that increases a player score', () => {
    const expectedAction = {
      type: INCREASE_SCORE
    }
    expect(increaseScore()).toEqual(expectedAction)
  })

  it ('should create an action that adds to a player power up', () => {
    const powerUp = 'range'
    const expectedAction = {
      type: ADD_POWER_UP,
      powerUp
    }
    expect(addToPlayerPowerUp(powerUp)).toEqual(expectedAction)
  })

  it ('should create an action that should reset all stats for a player', () => {
    const expectedAction = {
      type: KILL_PLAYER,
    }
    expect(killPlayer()).toEqual(expectedAction)
  })
})
