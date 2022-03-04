import React,{useReducer,useEffect,useCallback,useState} from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert

} from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as AuthActions  from '../../store/actions/auth' 
const FORM_UPDATE = "UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let UpdatedformIsValid = true;
    for (const key in updatedValidities) {
      UpdatedformIsValid = UpdatedformIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: UpdatedformIsValid,
    };
  }
};
const AuthScreen = (props) => {
  const dispatch=useDispatch()
  const [error,setError]=useState()
  const [isSignUp,setIsSignUp]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
     email:'',
     password:''
    },
    inputValidities: {
      email:false,
     password:false
    },
    formIsValid:  false,
  });
  const inputChangedHandler = useCallback((inputIdentifier, inputValue,inputValidity) => {
  console.log(inputIdentifier, inputValue,inputValidity)
    dispatchFormState({
      type: FORM_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatchFormState]);

  useEffect(()=>{
    if(error){
      Alert.alert('An error occured',error,[{text:'OKAY'}])
    }
  },[error])

  const authHandler=()=>{
    let action;
    if(isSignUp)
 action=AuthActions.signup(formState.inputValues.email,formState.inputValues.password)
    else
    action=AuthActions.login(formState.inputValues.email,formState.inputValues.password)

    setError(null)
   setIsLoading(true)
  try {
    dispatch(action); 
    // props.navigation.navigate('Shop')
  } catch (error) {
    setError(error.message)
  }
   
    setIsLoading(false)

  }
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
              errorText="Please enter a valid e-mail"
              email
              onInputChange={inputChangedHandler}
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
              errorText="Please enter a valid passsword"
              onInputChange={inputChangedHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
            {isLoading?<ActivityIndicator size="large" color="red"/>: <Button title={isSignUp?"Sign up":"Login"} color={Colors.primary} onPress={authHandler} />}
            </View>
            <View style={styles.buttonContainer}>
             <Button
                title={`Switch to ${isSignUp?"Login":"Sign up"}`}
                color={Colors.primary}
                onPress={()=>setIsSignUp(prevState=>!prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </>
  );
};
export const screenOptions = {
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
