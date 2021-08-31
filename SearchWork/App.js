import React from 'react';
import { Provider } from 'react-redux';
//import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import AppNavigation from './src/navigation/AppNavigation';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import reduxStore from './store';


const App = () => {

  const {store, persistor} = reduxStore();

  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  )
}

  // const {store, persistor} = reduxStore()
//   return(
//     <Provider store={store}>
//       <PersistGate loading={false} persistor={persistor}>
//         <AppNavigation />
//       </PersistGate>
//     </Provider>
//   )
// }

export default App;