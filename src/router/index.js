import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Splash, GetStarted, Register, Login } from '../pages'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator
      // initialRouteName="GetStarted" 
      headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default Router