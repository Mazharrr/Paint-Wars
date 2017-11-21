import scoreboardReducer, {
  initialState as scoreboardInitial,
  addNameMultiplayerScore,
  addMultiplayerAvatar,
  incrementMuliplayerScore,
  setMultiplayerScore,
  resetMultiplayerScore,
  restartMultiplayerScoreboard,
  ADD_MULTIPLAYER_NAME,
  ADD_PLAYER_AVATAR,
  INCREMENT_PLAYER_SCORE,
  SET_PLAYER_SCORE,
  RESET_PLAYER_SCORE,
  RESTART_GAME
} from "../reducers/Scoreboard";

describe("Scoreboard actions", () => {
  it("should create an action to add multiplayer name", () => {
    const name = "CaptainCrunch";
    const color = "green";
    const expectedAction = {
      type: ADD_MULTIPLAYER_NAME,
      color,
      name
    };
    expect(addNameMultiplayerScore(color, name)).toEqual(expectedAction);
  });

  it("should create an action to add multiplayer avatar", () => {
    const color = "green";
    const imageURL = "www.fillmurray.com/100/100";
    const expectedAction = {
      type: ADD_PLAYER_AVATAR,
      color,
      imageURL
    };
    expect(addMultiplayerAvatar(color, imageURL)).toEqual(expectedAction);
  });

  it("should create an action to increment score of player on multiplayer board", () => {
    const color = "green";
    const expectedAction = {
      type: INCREMENT_PLAYER_SCORE,
      color
    };
    expect(incrementMuliplayerScore(color)).toEqual(expectedAction);
  });

  it("should create an action to set player score on multiplayer board", () => {
    const color = "green";
    const score = 10;
    const expectedAction = {
      type: SET_PLAYER_SCORE,
      color,
      score
    };
    expect(setMultiplayerScore(color, score)).toEqual(expectedAction);
  });

  it("should create an action to reset player score on multiplayer board", () => {
    const color = "green";
    const expectedAction = {
      type: SET_PLAYER_SCORE,
      color
    };
    expect(setMultiplayerScore(color)).toEqual(expectedAction);
  });

  it("should create an action to reset all of the multiplayer board", () => {
    const expectedAction = {
      type: RESTART_GAME
    };
    expect(restartMultiplayerScoreboard()).toEqual(expectedAction);
  });
});

describe("Scoreboard reducer", () => {
  it("should return the initial state", () => {
    expect(scoreboardReducer(undefined, {})).toEqual(scoreboardInitial);
  });

  it("should handle ADD_MULTIPLAYER_NAME", () => {
    expect(
      scoreboardReducer(undefined, {
        type: ADD_MULTIPLAYER_NAME,
        color: "green",
        name: "Jimmy"
      })
    ).toEqual({
      green: {
        name: "Jimmy",
        avatar: "http://www.fillmurray.com/100/100",
        score: 0
      },
      blue: {
        name: "",
        avatar: "http://www.fillmurray.com/101/101",
        score: 0
      },
      purple: {
        name: "",
        avatar: "http://www.fillmurray.com/102/102",
        score: 0
      },
      red: {
        name: "",
        avatar: "http://www.fillmurray.com/103/103",
        score: 0
      }
    });
  });

  it("should handle ADD_PLAYER_AVATAR", () => {
    expect(
      scoreboardReducer(undefined, {
        type: ADD_PLAYER_AVATAR,
        color: "green",
        imageURL: "www.google.com"
      })
    ).toEqual({
      green: {
        name: "Jimmy",
        avatar: "www.google.com",
        score: 0
      },
      blue: {
        name: "",
        avatar: "http://www.fillmurray.com/101/101",
        score: 0
      },
      purple: {
        name: "",
        avatar: "http://www.fillmurray.com/102/102",
        score: 0
      },
      red: {
        name: "",
        avatar: "http://www.fillmurray.com/103/103",
        score: 0
      }
    });
  });

  it("should handle INCREMENT_PLAYER_SCORE", () => {
    expect(
      scoreboardReducer(undefined, {
        type: INCREMENT_PLAYER_SCORE,
        color: "green"
      })
    ).toEqual({
      green: {
        name: "Jimmy",
        avatar: "www.google.com",
        score: 1
      },
      blue: {
        name: "",
        avatar: "http://www.fillmurray.com/101/101",
        score: 0
      },
      purple: {
        name: "",
        avatar: "http://www.fillmurray.com/102/102",
        score: 0
      },
      red: {
        name: "",
        avatar: "http://www.fillmurray.com/103/103",
        score: 0
      }
    });
  });

  it("should handle SET_PLAYER_SCORE", () => {
    expect(
      scoreboardReducer(undefined, {
        type: SET_PLAYER_SCORE,
        color: "green",
        score: 50
      })
    ).toEqual({
      green: {
        name: "Jimmy",
        avatar: "www.google.com",
        score: 50
      },
      blue: {
        name: "",
        avatar: "http://www.fillmurray.com/101/101",
        score: 0
      },
      purple: {
        name: "",
        avatar: "http://www.fillmurray.com/102/102",
        score: 0
      },
      red: {
        name: "",
        avatar: "http://www.fillmurray.com/103/103",
        score: 0
      }
    });
  });

  it("should handle RESET_PLAYER_SCORE", () => {
    expect(
      scoreboardReducer(undefined, {
        type: RESET_PLAYER_SCORE,
        color: "green"
      })
    ).toEqual({
      green: {
        name: "Jimmy",
        avatar: "www.google.com",
        score: 0
      },
      blue: {
        name: "",
        avatar: "http://www.fillmurray.com/101/101",
        score: 0
      },
      purple: {
        name: "",
        avatar: "http://www.fillmurray.com/102/102",
        score: 0
      },
      red: {
        name: "",
        avatar: "http://www.fillmurray.com/103/103",
        score: 0
      }
    });
  });

  it("should handle RESTART_GAME", () => {
    expect(
      scoreboardReducer(
        {},
        {
          type: RESTART_GAME
        }
      )
    ).toEqual(scoreboardInitial);
  });
});
