import React from 'react';
import Store from './stores/Store';

var unsub = Store.subscribe(function () {
  console.log('STATE UPDATED', Store.getState());
})

console.log('state:before', Store.getState());
console.log('INCREMENT');
Store.dispatch({ type: 'INCREMENT' });
console.log('INCREMENT');
Store.dispatch({ type: 'INCREMENT' });
console.log('INCREMENT');
Store.dispatch({ type: 'INCREMENT' });
console.log('INCREMENT');
Store.dispatch({ type: 'INCREMENT' });
console.log('');
Store.dispatch({ type: 'EAT_ORANGE' });
console.log('EAT_ORANGE');
Store.dispatch({ type: 'EAT_ORANGE' });
console.log('EAT_ORANGE');
console.log('state:after', Store.getState());

unsub();
Store.dispatch({ type: 'INCREMENT' });

function App() {
  return (
    <div className="App">
      {/* {console.log('state', Store.getState())} */}
    </div>
  );
}

export default App;
