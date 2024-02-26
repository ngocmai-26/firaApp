import { useNavigation } from '@react-navigation/native'
import { Stack } from 'native-base'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

export const AppMiddleware = (props) => {
  const { logged, user, refresh } = useSelector((state) => state.authReducer)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    if (logged) {
      if (!user) {
        navigation.navigate('create-new-user')
      }
    }
    if (user && refresh && refresh.uri) {
      navigation.navigate('home')
    }
  }, [refresh])
  return <>{props.children}</>
}
