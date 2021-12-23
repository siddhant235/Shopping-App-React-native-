import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
const AuthScreen = (props) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={1}
        style={styles.screen}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid passsword"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                color={Colors.primary}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </>
  );
};
AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  authContainer: {
    width: "80%",
    maxWidth: 400,
    height: "50%",
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
export default AuthScreen;
