import { Provider } from 'react-redux';
import Screens from './app/Screens';
import { store } from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      {/* Screens */}
      <Screens />
    </Provider>
  ); 
}

