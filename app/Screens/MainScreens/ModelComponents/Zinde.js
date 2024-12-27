import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  const { status: libraryStatus } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (libraryStatus !== "granted") {
    Alert.alert("Media permission is required to upload image");
    return null;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // mediaTypes: ["images", "videos"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  console.log("Image Picker Result:", result);

  if (!result.canceled) {
    console.log("Selected Asset:", result.assets);
    return result.assets[0]; // Assuming assets array exists
  } else {
    console.log("Image picking was canceled.");
    return null;
  }
};

export const takePhoto = async () => {
  // Request camera permissions
  const { status: cameraStatus } =
    await ImagePicker.requestCameraPermissionsAsync();
  if (cameraStatus !== "granted") {
    Alert.alert("Camera permission is required to take photos");
    return;
  }

  // Launch the camera
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
};