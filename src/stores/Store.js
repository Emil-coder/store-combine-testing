var defaultAppleState = 0;
var defaultOrangeState = 10;

function appleReducer(state = defaultAppleState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return defaultAppleState;
    default:
      return state;
  }
}

function orangeReducer(state = defaultOrangeState, action) {
  switch (action.type) {
    case 'EAT_ORANGE':
      return state - 1;
    default:
      return state;
  }
}

var rootReducer = combineReducers({
  apple: appleReducer,
  orange: orangeReducer
})

var Store = createStore(rootReducer);


function createStore(reducer) {
  var state;
  var subscriptions = [];

  var obj = {
    getState: function () {
      return state;
    },
    dispatch: function (action) {
      state = reducer(state, action);
      subscriptions.forEach(function (fn) {
        fn();
      })
    },
    subscribe: function (fn) {
      subscriptions.push(fn);

      return function unsubscribe() {
        var index = subscriptions.indexOf(fn);
        subscriptions.splice(index, 1);
      }
    }
  }

  obj.dispatch({ type: 'REDUX_INIT' });
  return obj;

}

// var rootReducer = combineReducers({
//   apple: appleReducer,
//   orange: orangeReducer
// })

function combineReducers(stateTree) {
  var keys = Object.keys(stateTree);

  return function rootReducer(state = {}, action) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var reducer = stateTree[key];
      var subState = state[key];

      state[key] = reducer(subState, action);
    }

    return state;
  }
}


export default Store;