import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const OtpInput = ({ length = 4, onOtpSubmit = (combinedOtp) => { console.log(combinedOtp) } }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(0);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (index) => {
    setSelectedInput(index);
  };


  const handleKeyPress = (index, { key }) => {
    if (key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  

  return (
    <View style={{ flexDirection: 'row' }}>
      {otp.map((value, index) => (
        <TextInput
        key={index}
        ref={(input) => (inputRefs.current[index] = input)}
        value={value}
        onChangeText={(value) => handleChange(index, value)}
        onFocus={() => handleFocus(index)}
        onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent)}
        keyboardType="numeric"
        maxLength={1}
        style={[
          styles.otpInput,
          styles.outlined,
          index === selectedInput && styles.selectedInput,
        ]}
      />
      
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpInput: {
    width: 57,
    height: 57,
    margin: 10,
    textAlign: 'center',
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: '#DDDDDD',
  },
  selectedInput: {
    borderColor: 'blue',
  },
});
