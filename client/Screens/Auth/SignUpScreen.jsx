import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const nav = useNavigation();

  return (
    <LinearGradient
      colors={["#99a3e1", "#b3bce1", "#ccd5ee"]}
      style={styles.gradient}
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlCTNkPGNJRDtA4TuQqQTnJf5iLoQarqPQQ&s",
        }} // Replace with your image URL
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <TouchableOpacity style={styles.switchButtonInactive}>
            <Text style={styles.switchButtonTextInactive}>Sign in </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButtonActive}>
            <Text style={styles.switchButtonTextActive}>Register</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="apple" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => nav.navigate("signInScreen")}>
          <Text style={styles.signUpText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  switchButtonActive: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#5e4f98",
    borderRadius: 5,
  },
  switchButtonInactive: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  switchButtonTextActive: {
    color: "#fff",
  },
  switchButtonTextInactive: {
    color: "#000",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    color: "#000",
    elevation: 2, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 1 }, // iOS
    shadowOpacity: 0.2, // iOS
    shadowRadius: 1.41, // iOS
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#5e4f98",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 3 }, // iOS
    shadowOpacity: 0.27, // iOS
    shadowRadius: 4.65, // iOS
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginBottom: 20,
    color: "#000",
  },
  socialContainer: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#5e4f98",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 3 }, // iOS
    shadowOpacity: 0.27, // iOS
    shadowRadius: 4.65, // iOS
  },
  socialButtonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  signUpText: {
    marginTop: 20,
    color: "#5e4f98",
  },
});

export default SignUpScreen;