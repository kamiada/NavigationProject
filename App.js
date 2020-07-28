import "react-native-gesture-handler";
import React from "react";
import {StyleSheet, Text, View, Button, TextInput} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

function Screen1({navigation, route}) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Screen 1</Text>
      <Button
        title="Go to next screen"
        onPress={() =>
          navigation.navigate("SecondScreen", {
            itemId: 70,
            otherParam: "something something",
          })
        }
      />
      <Button
        title="Create a post"
        onPress={() => navigation.navigate("ScreenThree")}
      />
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
    </View>
  );
}

function Screen2({route, navigation}) {
  const {otherParam} = route.params;
  const {itemId} = route.params;
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Screen 2</Text>
      <Text>itemID:{JSON.stringify(itemId)}</Text>
      <Text>Other params: {JSON.stringify(otherParam)}</Text>
      <Button title="Go back" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back by function" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Screen3({navigation}) {
  const [postText, setPostText] = React.useState("");
  return (
    <View>
      <Text>Screen 3</Text>
      <TextInput
        multiline
        placeholder="Whats up?"
        style={{height: 200, padding: 10, backgroundColor: "white"}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Go back to main screen"
        onPress={() => navigation.navigate("Home", {post: postText})}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Screen1}
          options={{title: "Overview"}}
        />
        <Stack.Screen name="SecondScreen" component={Screen2} />

        <Stack.Screen name="ScreenThree" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
