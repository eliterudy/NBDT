import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { RootStackParamList } from "../../config/types";
import { COLORS, IMAGES } from "../../constants";
const API_URL =
  Platform.OS === "ios" ? "http://localhost:5000" : "http://192.168.0.5:5000";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Auth">;
};
const Auth = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const onLoggedIn = (token: any) => {
    fetch(`${API_URL}/private`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
            navigation.navigate("FoodDashboard");
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitHandler = () => {
    const payload = {
      email,
      name,
      password,
    };
    fetch(`${API_URL}/${isLogin ? "login" : "signup"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
          } else {
            onLoggedIn(jsonRes.token);
            setIsError(false);
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessage = () => {
    const status = isError ? `Error ` : `Success `;
    return status;
  };

  return (
    <ImageBackground source={IMAGES.loginBackground} style={styles.image}>
      <View style={styles.card}>
        <Text style={styles.heading}>{isLogin ? "Login" : "Signup"}</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              onChangeText={setEmail}
            ></TextInput>
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={COLORS.black}
                onChangeText={setName}
              ></TextInput>
            )}
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.black}
              onChangeText={setPassword}
            ></TextInput>
            <Text
              style={[styles.message, { color: isError ? "red" : "green" }]}
            >
              {message ? getMessage() : null}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={onChangeHandler}
            >
              <Text style={styles.buttonAltText}>
                {isLogin ? "Sign Up" : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "80%",
    marginTop: "40%",
    borderRadius: 20,
    maxHeight: 380,
    paddingBottom: "30%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "30%",
    color: COLORS.black,
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "5%",
  },
  inputs: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
    color: COLORS.black,
  },
  button: {
    width: "80%",
    backgroundColor: COLORS.darkGreen,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonAlt: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: COLORS.black,
  },
  buttonAltText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "400",
  },
  message: {
    fontSize: 16,
    marginVertical: "5%",
  },
});

export default Auth;
