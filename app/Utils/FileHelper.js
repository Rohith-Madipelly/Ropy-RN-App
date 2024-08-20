
import * as ImagePicker from 'expo-image-picker';

export async function openPickerImage (callback) {

   // No permissions request is necessary for launching the image library
   let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
  });
  if (!result.canceled) {
    // setImage(result.assets[0].uri);
    callback(result)
  }



}