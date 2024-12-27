import React, { useRef, useEffect, useState } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import Metrics from '../../../Utils/ResposivesUtils/Metrics';
import GiftIcon from '../../../assets/GiftIcon';
import ViewRewardsModel from '../ModelComponents/ViewRewardsModel';
import LottieView from 'lottie-react-native';


const FloatingButton = ({ Data }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation.start();

    return () => floatingAnimation.stop();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], // Adjust the range for floating effect
  });


  const [wishListmodelVisible, setWishListModelVisible] = useState(false);

  const showWishListModel = () => {
    setWishListModelVisible(true);
  };

  const closeWishListModel = () => {
    setWishListModelVisible(false);
  };



  return (
    <>
      <ViewRewardsModel
        // visible={wishListmodelVisible}
        visible={wishListmodelVisible}
        title="Redeem your coupon at the location"
        message={Data}
        onClose={closeWishListModel}
        onSubmit={(e, b) => {
          // getWishListData(wishListID)
        }}
      // dataforAPI={wishListID}
      // CallBackForDelete={() => { DeleteWishList() }}
      />

    
      <Animated.View style={[styles.floatingContainer, { transform: [{ translateY }] }]}>
      {/* <LottieView
        autoPlay loop
        // ref={animation}
        style={{
          width: 200,
          height: 200,
          position:'absolute',
          bottom:30
          // backgroundColor: '#eee',
        }}
        source={require('../../../assets/lottifile/Animation3.json')}
      /> */}
        <TouchableOpacity style={styles.button} onPress={() => { showWishListModel() }}>
          <GiftIcon />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    maxWidth: Metrics.rfv(40),
  },
  button: {
    backgroundColor: '#03C4CB',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
  },
});

export default FloatingButton;
