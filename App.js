import { Provider } from 'react-redux';
import Screens from './app/Screens';
import { store } from './app/redux/store';
import Metrics from './app/Utils/ResposivesUtils/Metrics';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider
        // renderType={{
        //   custom_type: (toast) => (
        //     <View style={{ padding: 15, backgroundColor: 'grey' }}>
        //       <Text>{toast.message}</Text>
        //     </View>
        //   )
        // }}
        placement="bottom"
        duration={5000}
        animationType='slide-in'
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        // dangerColor="red"
        warningColor="orange"
        // normalColor="rgba(100, 116, 139, 1)"
        // textStyle={{ fontSize: 20 }}
        offset={50} // offset for both top and bottom toasts
        offsetTop={1}
        offsetBottom={Metrics.rfv(70)}
        swipeEnabled={true}
      >
        <Screens />
      </ToastProvider>
    </Provider>
  );
}

