// import React from "react";r
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIKit, { setClientToken } from "./http-api";
import React, {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",

    margin: 14,
    padding: 12,
    // borderWidth:1,
    // borderColor:"black",
    // height:"100%"
  },
  loginScreenContainer: {
    // flex: 1,
    justifyContent: "center",
    // borderWidth:1,
    // borderColor:"black"
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",

    // marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    elevation: 2,
    // marginTop:300
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#3897f1",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },

  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    // marginTop: 30,
    width: 350,
    alignItems: "center",
  },
  image: {
    // marginTop: 150,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: "#ebebed",
    elevation: 1,
  },
  line: {
    width: 70,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#878787",
    marginBottom: 10,
  },
});

export default function LoginScreen({ navigation }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    const value = AsyncStorage.getItem("@storage_Key");
    value
      .then((v) => {
        const auth = JSON.parse(v);
        // console.log("🚀 ~ file: login.js ~ line 118 ~ auth.authentication.authorities.forEach ~ auth", auth)

        // setClientToken(auth.token);
        auth.authentication.authorities.forEach((auth) => {
          if (auth.authority == "ROLE_ADMIN") {
            navigation.navigate("Main");
            return;
          } else if (auth.authority == "ROLE_USER") {
            navigation.navigate("MaintainerHome");
            return;
          } else {
            alert("please signin...");
            return;
          }
        });
      })
      .catch((err) => {
        // console.log("🚀 ~ file: login.js ~ line 122 ~ useEffect ~ err", err);
      });
  }, []);

  async function onLoginPress() {
    const payload = { username: username, password: password };
    await AsyncStorage.clear();

    console.log(
      "🚀 ~ file: login.js ~ line 127 ~ onLoginPress ~ payload",
      payload
    );

    const onSuccess = ({ data }) => {
      // setClientToken(data.token);
      try {
        setusername("");
        setpassword("");

        const jsonValue = JSON.stringify(data);
        AsyncStorage.setItem("@storage_Key", jsonValue);
        AsyncStorage.setItem("token", data.token);
        console.log(
          "🚀 ~ file: login.js ~ line 138 ~ onSuccess ~ data.token",
          data.token
        );
        data.authentication.authorities.forEach((auth) => {
          console.log(
            "🚀 ~ file: login.js ~ line 139 ~ data.authentication.authorities.forEach ~ auth.authority",
            auth.authority
          );
          if (auth.authority == "ROLE_ADMIN") {
            navigation.navigate("Main");
            return;
          } else if (auth.authority == "ROLE_USER") {
            navigation.navigate("MaintainerHome");
            return;
          } else {
            alert("no role is assigned..");
            return;
          }
        });
      } catch (e) {
        console.log("🚀 ~ file: login.js ~ line 152 ~ onSuccess ~ e", e);
        alert(e);
      }
    };

    const onFailure = (error) => {
      console.log("🚀 ~ file: login.js ~ line 127 ~ onFailure ~ error", error);
      alert("Login Failed! Invalid Username or Password.");
    };

    APIKit.post("/users/authenticate", payload)
      .then(onSuccess)
      .catch(onFailure);
  }

  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior="height"
      enabled
      // keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <View style={styles.line}></View>
            <View>
              <Image
                style={styles.image}
                source={require("./assets/adaptive-icon.png")}
              />
            </View>
            <Text style={styles.logoText}>TNWR-BOARD</Text>
            <TextInput
              placeholder="Username"
              value={username}
              placeholderColor="#c4c3cb"
              onChangeText={(e) => setusername(e)}
              autoCapitalize="none"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              placeholderColor="#c4c3cb"
              autoCapitalize="none"
              style={styles.loginFormTextInput}
              onChangeText={(e) => setpassword(e)}
              secureTextEntry={true}
            />
          </View>
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => onLoginPress()}
            title="Login"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
