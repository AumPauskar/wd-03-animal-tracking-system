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

const SignUpScreen = () => {
  return (
    <LinearGradient colors={["#b3d4fc", "#d4e6f7"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#fff"
          autoCapitalize="none" // Prevent auto-capitalization
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#fff"
          autoCapitalize="none" // Prevent auto-capitalization
          keyboardType="email-address" // Set keyboard type for email
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
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

        <TouchableOpacity>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
  },
  submitButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f5828e", // Match gradient's first color
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginBottom: 20,
    color: "#fff",
  },
  socialContainer: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fcb045", // Match gradient's second color
    borderRadius: 10,
    marginVertical: 5,
  },
  socialButtonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  signInText: {
    marginTop: 20,
    color: "#fff",
  },
});

export default SignUpScreen;
