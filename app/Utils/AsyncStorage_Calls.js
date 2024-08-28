import AsyncStorage from '@react-native-async-storage/async-storage';


var ASO = function () { };

ASO.prototype.setTokenJWT = function (key, value, callBack) {
    AsyncStorage.setItem('Ropy$:' + key, JSON.stringify(value), (err) => {
        if (err) {
            callBack('Error setting token', false);
        }
        else {
            callBack(null, true);
            console.log("setTokenJWT ")
        }
    });
};



ASO.prototype.getTokenJWT = function (key, callBack) {
    AsyncStorage.getItem('Ropy$:' + key, (err, result) => {
        if (err) {
            callBack('Error getting token', null);
        } else {
            callBack(null, result ? JSON.parse(result) : null);
            console.log("res asn token >",result)

            try {
                if (result != null) {
                  result = result.replaceAll('"', '');
                }
              }
              catch (err) {
                console.log("Error in token quotes", err)
                if (err.response.status === 500) {
                  console.log("Internal Server Error", err.message)
                }
              }
            console.log("res asn token >>>>>>>>",result)
        }
    });
};




// ASO.prototype.RemoveTokenJWT = function (key, callBack) {

//     AsyncStorage.removeItem('Ropy$:' + key, (err, result) => {
//         if (err)
//             callBack('Error fetching token', false);
//         else {
//             // callBack('Error fetching token', true);
//             // console.log("resp resp resprespresp resp v resp v resp",result)
//             // callBack(JSON.parse("Done"), true);
//             // callBack('Error getting token', true);
//             // console.log("dsfvs")
//             callBack(null, result ? JSON.parse(result) : null);
//         }
//         // callBack(JSON.parse(resp), true);
        
//     });
// };


ASO.prototype.RemoveTokenJWT = function (key, callBack) {
    AsyncStorage.removeItem('Ropy$:' + key, (err) => {
        if (err) {
            callBack('Error removing token', false);
        } else {
            callBack(null, true);
            // console.log("Token removed successfully");
        }
    });
};



export default new ASO();
