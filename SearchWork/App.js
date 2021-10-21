import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './src/navigation/AppNavigation';
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