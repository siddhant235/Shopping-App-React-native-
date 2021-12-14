import React, {useState,useEffect, useCallback, useReducer } from "react";
import Colors from "../../constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as actions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
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
const EditProduct = (props) => {
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState()
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });
useEffect(()=>{
  if(error){
Alert.alert('An error occurreed!',error,[{text:'OKAY'}])
  }
},[error])
  const submitHandler = useCallback(async () => {
    if (!formState.inputValidities.title) {
      Alert.alert("Wrong Input", "Please check the errors", [
        {
          text: "okay",
        },
      ]);
      return;
    }
    setError(false)
    setIsLoading(true)
    try{
    if (editedProduct) {
     await dispatch(
        actions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      await dispatch(
        actions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }catch(err){
    setIsLoading(false)
    setError(err.message)
  }
  setIsLoading(false)
   
  }, [
    dispatch,
    prodId,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    formState.inputValidities.title,
  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangedHandler = useCallback((inputIdentifier, inputValue,inputValidity) => {
  
    dispatchFormState({
      type: FORM_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatchFormState]);

  if(isLoading)
  {
    return <View style={styles.centred}><ActivityIndicator size="large" color={Colors.primary}/></View>
  }
  return (
    <>
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
          id="title"
            label="Title"
            errorText="Please enter a valid Title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangedHandler}
            initialValue={editedProduct?editedProduct.title:''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
          id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid Image Url"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangedHandler}
            initialValue={editedProduct?editedProduct.imageUrl:''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
            id="price"
              label="Price"
              errorText="Please enter a valid Price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangedHandler}
             required
             min={0}
            />
          )}
          <Input
          id="description"
            label="Description"
            errorText="Please enter a valid Description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangedHandler}
            initialValue={editedProduct?editedProduct.description:''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
EditProduct.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centred:{
    flex:1,
    justifyContent:'center',
  }
});
export default EditProduct;
