import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
const AuthScreen = (props) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
              <Input id="email" label="E-mail" keyboardType="email-address" required email onValueChange={()=>{}} initialValue=""/>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({});
export default AuthScreen;
