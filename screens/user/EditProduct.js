import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as actions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";

const FORM_UPDATE = "UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
      const updatedValues={
          ...state.inputValues,
         [action.input]:action.value

      }
      const updatedValidities={
          ...state.inputValidities,
          [action.input]:action.isValid
      };
      let UpdatedformIsValid=true;
      for(const key in updatedValidities){
          UpdatedformIsValid=UpdatedformIsValid && updatedValidities[key]
      }
      return{
          ...state,
          inputValues:updatedValues,
          inputValidities:updatedValidities,
          formIsValid:UpdatedformIsValid
      }
  }
};
const EditProduct = (props) => {
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

  const submitHandler = useCallback(() => {
    if (!formState.inputValidities.title) {
      Alert.alert("Wrong Input", "Please check the errors", [
        {
          text: "okay",
        },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(actions.updateProduct(prodId, formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl));
    } else {
      dispatch(actions.createProduct(formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl, +formState.inputValues.price));
    }
  }, [dispatch, prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl, formState.inputValues.price, formState.inputValidities.title]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.title}
              autoCapitalize="sentences"
              onEndEditing={() => console.log("onEndEditing")}
              onSubmitEditing={() => console.log("onSubmitEditing")}
              autoCorrect
              returnKeyType="next"
              onChangeText={textChangeHandler.bind(this,'title')}
            />
            {!formState.inputValidities.title&& <Text>Please enter a valid title!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imageUrl}
              onChangeText={textChangeHandler.bind(this,'imageUrl')}
            />
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                keyboardType="decimal-pad"
                onChangeText={textChangeHandler.bind(this,'price')}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.description}
              onChangeText={textChangeHandler.bind(this,'description')}
            />
          </View>
        </View>
      </ScrollView>
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
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
export default EditProduct;
