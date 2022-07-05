import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {

  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/801-555-1212
  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber, {
    method: 'Post',
    headers: { 
      'Content-Type': 'application/text'
    }
  });
  const loginResponseText = await loginResponse.text();//Converts the promise to a string by using await
  console.log("phoneNumber", phoneNumber);
  console.log('Login Response', loginResponseText);
};

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setUserEmail}) =>{
  console.log('Phone Number', phoneNumber)
  console.log('oneTimePassword', oneTimePassword)

  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'Post',
    headers: { 
      'Content-Type': 'application/text'
    },
    body:JSON.stringify({
      "phoneNumber":phoneNumber,
      "oneTimePassword":oneTimePassword
    })
  });

const responseCode = loginResponse.status;//200 means logged in successfully
console.log('Response Status Code', responseCode);  
if(responseCode==200){
  setUserLoggedIn(true);
  const token = await loginResponse.text();
  console.log(token)
  const emailResponse = await fetch('https://dev.stedi.me/validate/'+token);
  const textEmail = await emailResponse.text();
  setUserEmail(textEmail)
}}

const Login = (props) => {
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
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserEmail:props.setUserEmail});
        }}
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