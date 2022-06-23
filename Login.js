import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {

  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/682-308-9442
  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber, {
    method: 'Post',
    headers: { 
      'Content-Type': 'application/text'
    }
  });
  const loginResponseText = await loginResponse.text();//Converts the promise to a string by using await
  console.log("phoneNumber", phoneNumber);
};

const getToken = async({phoneNumber,otp}) =>{
  console.log('Phone Number', phoneNumber)
  console.log('OTP', otp)

  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'Post',
    headers: { 
      'Content-Type': 'application/text'
    },
    body:{
      phoneNumber,
      oneTimePassword:otp
    }
  });
  const token = await loginResponse.text();
  console.log(token)
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
        placeholderTextColor='#D3D3D3'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
        >
          <Text>Send Text</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='#D3D3D3'
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{getToken({phoneNumber,otp})}}
        >
          <Text>Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop:100
  },
  button:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;