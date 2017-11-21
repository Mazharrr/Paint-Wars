const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const reducer = require("./reducers/index.js");
module.exports = createStore(reducer, applyMiddleware(thunkMiddleware));
